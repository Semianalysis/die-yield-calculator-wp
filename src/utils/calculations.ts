import {
	waferSizes,
	panelSizes,
	yieldModels
} from "../config";
import { Die, DieState, FabResults, Position } from "../types";
import {
	getRectCorners,
	isInsideCircle,
	isInsideRectangle,
	rectanglesInCircle,
	rectanglesInRectangle
} from "./geometry";

/**
 * Determine the yield based on the provided model
 * @param defectRate decimal representing how many dies will be defective
 * @param criticalArea die area
 * @param model model to calculate the yield
 * @param criticalLayers number of critical layers for Bose-Einstein model
 * @param manualYield manual yield percentage
 * @returns yield percentage
 */
export function getFabYield(
	defectRate: number,
	criticalArea: number,
	model: keyof typeof yieldModels,
	criticalLayers: number,
	manualYield: number
) {
	if (!defectRate) {
		return 1;
	}

	const defects = (criticalArea * defectRate) / 100;

	if (model === "bose-einstein") {
		return yieldModels[model].yield(defects, criticalLayers);
	}

	if (model === "manual") {
		return yieldModels[model].yield(manualYield);
	}

	return yieldModels[model].yield(defects);
}

/**
 * Generate a set of length n of randomly selected numbers from a range (min-max)
 * @param min bottom of range
 * @param max top of range
 * @param n number of random numbers to generate
 * @returns set of n random numbers
 */
export function randomNumberSetFromRange(min: number, max: number, n: number) {
	const numbers: Set<number> = new Set();

	while (numbers.size < n) {
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		numbers.add(randomNum);
	}

	return numbers;
}

/**
 * Count the total number of dies for each possible state (good, defective, partial, lost)
 * @param dieStates array of die state strings
 * @returns object containing counts for each die state
 */
export function getDieStateCounts(dieStates: Array<DieState>) {
	let goodDies = 0;
	let defectiveDies = 0;
	let partialDies = 0;
	let lostDies = 0;
	dieStates.forEach((dieState) => {
		switch (dieState) {
			case "good":
				goodDies++;
				break;
			case "defective":
				defectiveDies++;
				break;
			case "partial":
				partialDies++;
				break;
			case "lost":
				lostDies++;
				break;
		}
	});

	return {
		goodDies,
		defectiveDies,
		partialDies,
		lostDies
	};
}

export type InputValues = {
	dieWidth: number;
	dieHeight: number;
	criticalArea: number;
	defectRate: number;
	lossyEdgeWidth: number;
	notchKeepOutHeight: number;
	substrateCost: number;
	scribeHoriz: number;
	scribeVert: number;
	transHoriz: number;
	transVert: number;
	criticalLayers: number;
	manualYield: number;
};

/**
 * Get the offset (x, y) to apply to all dies.
 * @param inputs
 * @param fieldWidth
 * @param fieldHeight
 * @param fieldCenteringEnabled center by shot or by shot grid
 * @returns object containing x and y offsets
 */
function getDieOffset(
	inputs: InputValues,
	fieldWidth: number,
	fieldHeight: number,
	fieldCenteringEnabled: boolean
) {
	const dieOffsetX = fieldCenteringEnabled
		? inputs.scribeHoriz * 0.5
		: fieldWidth * -0.5;
	const dieOffsetY = fieldCenteringEnabled
		? inputs.scribeVert * 0.5
		: fieldHeight * -0.5;
	return {
		x: dieOffsetX + inputs.transHoriz,
		y: dieOffsetY + inputs.transVert
	};
}

/**
 * Calculate the position of dies in a single shot. Dies are centered within the
 * reticle shot and spaced by the scribe width and height. Also returns how
 * many rows and columns of dies are in a single shot.
 * @param dieWidth width of one die
 * @param dieHeight height of one die
 * @param scribeHoriz minimum scribe line width between any 2 die
 * @param scribeVert minimum scribe line height between any 2 die
 * @param fieldWidth width of the reticle
 * @param fieldHeight height of the reticle
 */
export function getRelativeDiePositions(
	dieWidth: number,
	dieHeight: number,
	scribeHoriz: number,
	scribeVert: number,
	fieldWidth: number,
	fieldHeight: number
) {
	return rectanglesInRectangle(
		fieldWidth,
		fieldHeight,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		0,
		0,
		false,
		false
	);
}

/**
 * Calculate the absolute position of each die based on shot coordinates + die
 * coordinates within shot. Assign a state based on whether it is partly or fully
 * outside the wafer
 * @param shotPositions coordinates of each shot/field
 * @param relativeDiePositions coordinates of dies relative to a shot
 * @param dieWidth width of one die
 * @param dieHeight height of one die
 * @param fabYield 0-1 float representing non-defective yield of all dies
 * @param isInsideWafer callback fn to determine if coordinate is within wafer coords
 * @returns object containing all dies, full and partial shot counts, and positions
 * of shots that will be taken
 */
export function createDieMap(
	shotPositions: Array<Position>,
	relativeDiePositions: Array<Position>,
	dieWidth: number,
	dieHeight: number,
	fabYield: number,
	isInsideWafer: (coordinate: Position) => boolean
) {
	let goodDies = 0;
	let fullShotCount = 0;
	let partialShotCount = 0;
	const shotsOnWafer: Position[] = [];

	const dies = shotPositions.reduce(
		(acc: Array<Die>, shotPosition, shotIndex) => {
			const diesInShot = relativeDiePositions.map((relativeDie, dieIndex): Die => {
				let dieState: DieState = "good";
				const absoluteDieX = relativeDie.x + shotPosition.x;
				const absoluteDieY = relativeDie.y + shotPosition.y;
				const corners = getRectCorners(
					absoluteDieX,
					absoluteDieY,
					dieWidth,
					dieHeight
				);
				const goodCorners = corners.filter(isInsideWafer);

				if (!goodCorners.length) {
					dieState = "lost";
				} else if (goodCorners.length < 4) {
					dieState = "partial";
				} else {
					goodDies += 1;
				}

				return {
					key: `${shotIndex}:${dieIndex}`,
					dieState,
					x: absoluteDieX,
					y: absoluteDieY,
					width: dieWidth,
					height: dieHeight
				};
			});

			const goodDiesInShot = diesInShot.filter((die) => die.dieState === "good").length;

			// Take the shot as long as 1 or more dies within it will be "good"...
			if (goodDiesInShot) {
				shotsOnWafer.push(shotPosition);

				// If all shots are good, this is a 'full' shot
				if (goodDiesInShot === diesInShot.length) {
					fullShotCount += 1;
				} else {
					// ...otherwise it's a 'partial' shot
					partialShotCount += 1;
				}

				return [...acc, ...diesInShot];
			}

			// ...otherwise skip the shot
			return acc;
		},
		[]
	);

	// Sort die map so all good dies are first
	dies.sort((a, b) => {
		if (a.dieState === "good" && b.dieState !== "good") {
			return -1;
		} else if (a.dieState !== "good" && b.dieState === "good") {
			return 1;
		}
		return 0;
	});

	// Randomly distribute n defective dies amongst good dies on the map based on fab yield
	const numDefectiveDies = Math.round((1 - fabYield) * goodDies);
	const defectiveDieKeys = randomNumberSetFromRange(
		0,
		goodDies - 1,
		numDefectiveDies
	);

	defectiveDieKeys.forEach((key) => {
		dies[key].dieState = "defective";
	});

	return {
		dies,
		fullShotCount,
		partialShotCount,
		shotsOnWafer
	};
}

/**
 * Calculate the percentage of the reticle area that is made of up dies
 * @param fieldWidth reticle width
 * @param fieldHeight reticle height
 * @param dieWidth width of one die
 * @param dieHeight height of one die
 * @param diesPerShot number of dies in a single shot
 * @returns percentage of reticle area that is made of up dies
 */
function getReticleUtilization(
	fieldWidth: number,
	fieldHeight: number,
	dieWidth: number,
	dieHeight: number,
	diesPerShot: number
) {
	const reticleArea = fieldWidth * fieldHeight;
	const dieAreaPerShot = dieWidth * dieHeight * diesPerShot;
	return dieAreaPerShot / reticleArea;
}

function getTrimmedFieldDimensions(params: {
	 diesInShotPositions: Array<Position>,
	 dieWidth: number,
	 dieHeight: number,
	 scribeHoriz: number,
	 scribeVert: number,
	 fieldWidth: number,
	 fieldHeight: number
}) {
	const {
		diesInShotPositions,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	} = params;
	const lastDieInShot = diesInShotPositions.at(-1);

	if (lastDieInShot) {
		return {
			width: lastDieInShot?.x + dieWidth + scribeHoriz / 2,
			height: lastDieInShot?.y + dieHeight + scribeVert / 2
		};
	}

	return {
		width: fieldWidth,
		height: fieldHeight
	};
}

/**
 * Use the given inputs to calculate how many dies would fit on the given panel
 * shaped wafer and what each die's state would be.
 * @param inputVals input values
 * @param selectedSize selected wafer size
 * @param selectedModel selected yield model
 * @param fieldWidth reticle width
 * @param fieldHeight reticle height
 * @param fieldCenteringEnabled whether to center-align the shot(s) on the wafer vs the shot grid
 * @returns object containing all dies, full and partial shot counts, and positions
 */
export function evaluatePanelInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof panelSizes,
	selectedModel: keyof typeof yieldModels,
	fieldWidth: number,
	fieldHeight: number,
	fieldCenteringEnabled: boolean,
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		scribeHoriz,
		scribeVert,
		lossyEdgeWidth,
		criticalLayers,
		manualYield,
		substrateCost
	} = inputVals;
	const fabYield = getFabYield(
		defectRate,
		criticalArea,
		selectedModel,
		criticalLayers,
		manualYield
	);
	const { width, height } = panelSizes[selectedSize];

	const { x: offsetX, y: offsetY } = getDieOffset(
		inputVals,
		fieldWidth,
		fieldHeight,
		fieldCenteringEnabled
	);

	// First, calculate the position of dies in a single shot
	const diesInShot = getRelativeDiePositions(
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	);

	// Trim the reticle to get the true shot size
	const {
		width: trimmedFieldWidth,
		height: trimmedFieldHeight
	} = getTrimmedFieldDimensions({
		diesInShotPositions: diesInShot.positions,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	});

	// Calculate the reticle shot map
	const shotPositions = rectanglesInRectangle(
		width,
		height,
		trimmedFieldWidth,
		trimmedFieldHeight,
		0,
		0,
		offsetX,
		offsetY,
		fieldCenteringEnabled,
		true
	).positions;

	const dieMap = createDieMap(
		shotPositions,
		diesInShot.positions,
		dieWidth,
		dieHeight,
		fabYield,
		(coordinate) => {
			return isInsideRectangle(
				coordinate.x,
				coordinate.y,
				lossyEdgeWidth,
				lossyEdgeWidth,
				width - lossyEdgeWidth * 2,
				height - lossyEdgeWidth * 2
			);
		}
	);

	const { defectiveDies, partialDies, lostDies, goodDies } = getDieStateCounts(
		dieMap.dies.map((die) => die.dieState)
	);

	const dieCost = goodDies > 0 ? substrateCost / goodDies : undefined;

	return {
		dies: dieMap.dies,
		diePerRow: diesInShot.numCols,
		diePerCol: diesInShot.numRows,
		defectiveDies,
		partialDies,
		lostDies,
		totalDies: dieMap.dies.length,
		goodDies,
		fabYield,
		fields: shotPositions,
		fullShotCount: dieMap.fullShotCount,
		partialShotCount: dieMap.partialShotCount,
		reticleUtilization: getReticleUtilization(
			fieldWidth,
			fieldHeight,
			dieWidth,
			dieHeight,
			diesInShot.positions.length
		),
		dieCost,
		trimmedFieldWidth,
		trimmedFieldHeight
	};
}

/**
 * Use the given inputs to calculate how many dies would fit on the given disc
 * shaped wafer and what each die's state would be.
 * @param inputVals input values
 * @param selectedSize selected wafer size
 * @param selectedModel selected yield model
 * @param fieldWidth reticle width
 * @param fieldHeight reticle height
 * @param fieldCenteringEnabled whether to center-align the shot(s) on the wafer vs the shot grid
 * @returns object containing all dies, full and partial shot counts, and positions
 */
export function evaluateDiscInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof waferSizes,
	selectedModel: keyof typeof yieldModels,
	fieldWidth: number,
	fieldHeight: number,
	fieldCenteringEnabled: boolean,
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		lossyEdgeWidth,
		notchKeepOutHeight,
		substrateCost,
		scribeHoriz,
		scribeVert,
		criticalLayers,
		manualYield
	} = inputVals;
	const fabYield = getFabYield(
		defectRate,
		criticalArea,
		selectedModel,
		criticalLayers,
		manualYield
	);
	const { width } = waferSizes[selectedSize];

	const { x: offsetX, y: offsetY } = getDieOffset(
		inputVals,
		fieldWidth,
		fieldHeight,
		fieldCenteringEnabled
	);

	// First, calculate the position of dies in a single shot
	const diesInShot = getRelativeDiePositions(
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	);

	// Trim the reticle to get the true shot size
	const {
		width: trimmedFieldWidth,
		height: trimmedFieldHeight
	} = getTrimmedFieldDimensions({
		diesInShotPositions: diesInShot.positions,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	});

	// First, calculate the reticle shot map
	const shotPositions = rectanglesInCircle(
		width,
		trimmedFieldWidth,
		trimmedFieldHeight,
		0,
		0,
		offsetX,
		offsetY,
		true
	);


	const dieMap = createDieMap(
		shotPositions,
		diesInShot.positions,
		dieWidth,
		dieHeight,
		fabYield,
		(coordinate) => {
			const radiusInsideLossyEdge = width / 2 - lossyEdgeWidth;
			const isInsideLossyEdge = isInsideCircle(
				coordinate.x,
				coordinate.y,
				width / 2,
				width / 2,
				radiusInsideLossyEdge
			);
			const isAboveNotchKeepout = coordinate.y < width - notchKeepOutHeight;
			return isInsideLossyEdge && isAboveNotchKeepout;
		}
	);

	const { defectiveDies, partialDies, lostDies, goodDies } = getDieStateCounts(
		dieMap.dies.map((die) => die.dieState)
	);

	const dieCost = goodDies > 0 ? substrateCost / goodDies : undefined;

	return {
		dies: dieMap.dies,
		totalDies: dieMap.dies.length,
		diePerRow: diesInShot.numCols,
		diePerCol: diesInShot.numRows,
		goodDies,
		defectiveDies,
		partialDies,
		lostDies,
		fabYield,
		fields: shotPositions,
		fullShotCount: dieMap.fullShotCount,
		partialShotCount: dieMap.partialShotCount,
		reticleUtilization: getReticleUtilization(
			trimmedFieldWidth,
			trimmedFieldHeight,
			dieWidth,
			dieHeight,
			diesInShot.positions.length
		),
		dieCost,
		trimmedFieldWidth,
		trimmedFieldHeight
	};
}

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
 */
export function getFabYield(
	defectRate: number,
	criticalArea: number,
	model: keyof typeof yieldModels
) {
	if (!defectRate) {
		return 1;
	}

	const defects = (criticalArea * defectRate) / 100;
	return yieldModels[model].yield(defects);
}

/**
 * Generate a set of length n of randomly selected numbers from a range (min-max)
 * @param min bottom of range
 * @param max top of range
 * @param n number of random numbers to generate
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
	scribeHoriz: number;
	scribeVert: number;
	transHoriz: number;
	transVert: number;
};

/**
 * Get the offset (x, y) to apply to all dies.
 * @param inputs
 * @param waferCenteringEnabled center by wafer or by die
 */
function getDieOffset(inputs: InputValues, waferCenteringEnabled: boolean) {
	const dieOffsetX = waferCenteringEnabled
		? inputs.scribeHoriz * 0.5
		: inputs.dieWidth * -0.5;
	const dieOffsetY = waferCenteringEnabled
		? inputs.scribeVert * 0.5
		: inputs.dieHeight * -0.5;
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
 * @param fieldWidth width of the shot/field
 * @param fieldHeight height of the shot/field
 */
function getRelativeDiePositions(
	dieWidth: number,
	dieHeight: number,
	scribeHoriz: number,
	scribeVert: number,
	fieldWidth: number,
	fieldHeight: number,
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
		true,
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
	const numDefectiveDies = goodDies - Math.floor(fabYield * goodDies);
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
		shotsOnWafer,
	};
}

/**
 * Use the given inputs to calculate how many dies would fit on the given panel
 * shaped wafer and what each die's state would be.
 * @param inputVals
 * @param selectedSize
 * @param selectedModel
 * @param fieldWidth
 * @param fieldHeight
 */
export function evaluatePanelInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof panelSizes,
	selectedModel: keyof typeof yieldModels,
	fieldWidth: number,
	fieldHeight: number,
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		scribeHoriz,
		scribeVert,
		lossyEdgeWidth
	} = inputVals;
	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { width, height } = panelSizes[selectedSize];

	const { x: offsetX, y: offsetY } = getDieOffset(
		inputVals,
		true
	);

	// First, calculate the reticle shot map
	const shotPositions = rectanglesInRectangle(
		width,
		height,
		fieldWidth,
		fieldHeight,
		0,
		0,
		offsetX - fieldWidth / 2,
		offsetY - fieldHeight / 2,
		true,
		true
	).positions;

	// Calculate the position of dies in a single shot
	const diesInShot = getRelativeDiePositions(
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
	);

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
	};
}

/**
 * Use the given inputs to calculate how many dies would fit on the given disc
 * shaped wafer and what each die's state would be.
 * @param inputVals
 * @param selectedSize
 * @param selectedModel
 * @param fieldWidth
 * @param fieldHeight
 */
export function evaluateDiscInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof waferSizes,
	selectedModel: keyof typeof yieldModels,
	fieldWidth: number,
	fieldHeight: number,
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		lossyEdgeWidth,
		notchKeepOutHeight,
		scribeHoriz,
		scribeVert
	} = inputVals;

	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { width } = waferSizes[selectedSize];

	const { x: offsetX, y: offsetY } = getDieOffset(
		inputVals,
		true
	);

	// First, calculate the reticle shot map
	const shotPositions = rectanglesInCircle(
		width,
		fieldWidth,
		fieldHeight,
		0,
		0,
		offsetX,
		offsetY,
		true
	);

	// Calculate the position of dies in a single shot
	const diesInShot = getRelativeDiePositions(
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		fieldWidth,
		fieldHeight
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
	};
}

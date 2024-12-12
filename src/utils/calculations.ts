import {waferSizes, panelSizes, yieldModels} from "../config";
import {Die, DieState, FabResults} from "../types";
import {
	Position,
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

	const defects = criticalArea * defectRate / 100;
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
	const dieOffsetX = waferCenteringEnabled ? inputs.scribeHoriz * 0.5 : inputs.dieWidth * -0.5;
	const dieOffsetY = waferCenteringEnabled ? inputs.scribeVert * 0.5 : inputs.dieHeight * -0.5;
	return {
		x: dieOffsetX + inputs.transHoriz,
		y: dieOffsetY + inputs.transVert
	};
}


/**
 * Calculate the position of dies in a single shot
 * @param dieWidth
 * @param dieHeight
 * @param scribeHoriz
 * @param scribeVert
 */
function getRelativeDiePositions(
	dieWidth: number,
	dieHeight: number,
	scribeHoriz: number,
	scribeVert: number
) {
	return rectanglesInRectangle(
		26,
		33,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		0,
		0,
		false,
		false,
	);
}

/**
 * Calculate the absolute position of each die based on shot coordinates + die
 * coordinates within shot. Assign a state based on whether it is partly or fully
 * outside the wafer
 * @param shotPositions coordinates of each shot/field
 * @param diesInShot coordinates of dies relative to a shot
 * @param dieWidth width of one die
 * @param dieHeight height of one die
 * @param fabYield 0-1 float representing non-defective yield of all dies
 * @param isInsideWafer callback fn to determine if coordinate is within wafer coords
 */
function createDieMap(
	shotPositions: Position[],
	diesInShot: Position[],
	dieWidth: number,
	dieHeight: number,
	fabYield: number,
	isInsideWafer: (coordinate: Position) => boolean,
) {
	const dieMap = shotPositions.reduce((acc: Die[], shotPosition, shotIndex) => {
		const dies = diesInShot.map((relativeDie, dieIndex): Die => {
			let dieState: DieState = "good";
			const absoluteDieX = relativeDie.x + shotPosition.x;
			const absoluteDieY = relativeDie.y + shotPosition.y;
			const corners = getRectCorners(absoluteDieX, absoluteDieY, dieWidth, dieHeight);
			const goodCorners = corners.filter(isInsideWafer);

			if (!goodCorners.length) {
				dieState = "lost";
			} else if (goodCorners.length < 4) {
				dieState = "partial";
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

		// Take the shot as long as 1 or more dies within it will be "good"...
		if (dies.find((die) => die.dieState === "good")) {
			return [
				...acc,
				...dies,
			];
		}

		// ...otherwise skip the shot
		return acc;
	}, []);

	// Randomly distribute n defective dies around the map based on fab yield
	let totalDies = dieMap.length;
	const numDefectiveDies = totalDies - Math.floor(fabYield * totalDies);
	const defectiveDieKeys = randomNumberSetFromRange(0, totalDies - 1, numDefectiveDies);

	defectiveDieKeys.forEach((key) => {
		dieMap[key].dieState = "defective";
	});

	return dieMap;
}

/**
 * Use the given inputs to calculate how many dies would fit on the given panel
 * shaped wafer and what each die's state would be.
 * @param inputVals
 * @param selectedSize
 * @param selectedModel
 * @param waferCenteringEnabled
 */
export function evaluatePanelInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof panelSizes,
	selectedModel: keyof typeof yieldModels,
	waferCenteringEnabled: boolean
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		scribeHoriz,
		scribeVert,
		lossyEdgeWidth,
	} = inputVals;
	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const {width, height} = panelSizes[selectedSize];

	const {
		x: offsetX,
		y: offsetY
	} = getDieOffset(inputVals, waferCenteringEnabled);

	// First, calculate the reticle shot map
	const shotPositions = rectanglesInRectangle(
		width,
		height,
		26,
		33,
		0,
		0,
		offsetX,
		offsetY,
		true,
		true,
	);

	// Calculate the position of dies in a single shot
	const diesInShot = getRelativeDiePositions(
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
	);

	const dieMap = createDieMap(
		shotPositions,
		diesInShot,
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
			)
		}
	);

	const {
		defectiveDies,
		partialDies,
		lostDies,
		goodDies
	} = getDieStateCounts(dieMap.map((die) => die.dieState));

	return {
		dies: dieMap,
		defectiveDies,
		partialDies,
		lostDies,
		totalDies: dieMap.length,
		goodDies,
		fabYield
	};
}

/**
 * Use the given inputs to calculate how many dies would fit on the given disc
 * shaped wafer and what each die's state would be.
 * @param inputVals
 * @param selectedSize
 * @param selectedModel
 * @param waferCenteringEnabled
 */
export function evaluateDiscInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof waferSizes,
	selectedModel: keyof typeof yieldModels,
	waferCenteringEnabled: boolean
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		lossyEdgeWidth,
		scribeHoriz,
		scribeVert
	} = inputVals;

	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const {width} = waferSizes[selectedSize];

	const {
		x: offsetX,
		y: offsetY
	} = getDieOffset(inputVals, waferCenteringEnabled);

	// First, calculate the reticle shot map
	const shotPositions = rectanglesInCircle(
		width,
		26,
		33,
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
	);

	const dieMap = createDieMap(
		shotPositions,
		diesInShot,
		dieWidth,
		dieHeight,
		fabYield,
		(coordinate) => {
			const radiusInsideLossyEdge = width / 2 - lossyEdgeWidth;
			return isInsideCircle(coordinate.x, coordinate.y, width / 2, width / 2, radiusInsideLossyEdge)
		}
	);

	const {
		defectiveDies,
		partialDies,
		lostDies,
		goodDies,
	} = getDieStateCounts(dieMap.map((die) => die.dieState));

	return {
		dies: dieMap,
		totalDies: dieMap.length,
		goodDies,
		defectiveDies,
		partialDies,
		lostDies,
		fabYield
	};
}

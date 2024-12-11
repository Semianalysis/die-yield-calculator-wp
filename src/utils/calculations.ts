import { waferSizes, panelSizes, yieldModels } from "../config";
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
function randomNumberSetFromRange(min: number, max: number, n:number) {
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
	const { width, height } = panelSizes[selectedSize];

	const {
		x: offsetX,
		y: offsetY
	} = getDieOffset(inputVals, waferCenteringEnabled);

	const positions = rectanglesInRectangle(
		width,
		height,
		dieWidth,
		dieHeight,
		scribeVert,
		scribeHoriz,
		offsetX,
		offsetY
	);

	const totalDies = positions.length;
	const nonDefectiveDies = Math.floor(fabYield * totalDies);

	let dieStates = new Array(totalDies).fill("defective");
	for (let i = 0; i < nonDefectiveDies; i++) {
		dieStates[i] = "good";
	}

	for (let i = dieStates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dieStates[i], dieStates[j]] = [dieStates[j], dieStates[i]];
	}

	for (let i = 0; i < dieStates.length; i++) {
		const position = positions[i];
		const corners = getRectCorners(position.x, position.y, dieWidth, dieHeight);
		const goodCorners = corners.filter((corner) => isInsideRectangle(
			corner.x,
			corner.y,
			lossyEdgeWidth,
			lossyEdgeWidth,
			width - lossyEdgeWidth * 2,
			height - lossyEdgeWidth * 2
		));

		if (!goodCorners.length) {
			dieStates[i] = "lost";
		} else if (goodCorners.length < 4) {
			dieStates[i] = "partial";
		}

		dies[i] = {
			key: i,
			dieState: dieStates[i],
			x: position.x,
			y: position.y,
			width: dieWidth,
			height: dieHeight
		};
	}

	const {
		defectiveDies,
		partialDies,
		lostDies,
		goodDies
	} = getDieStateCounts(dieStates);

	return {
		dies,
		defectiveDies,
		partialDies,
		lostDies,
		totalDies,
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

	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { width } = waferSizes[selectedSize];

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

	// Calculate the dies in each shot
	const diesInShot = rectanglesInRectangle(
		26,33,dieWidth,dieHeight,scribeHoriz, scribeVert,0,0
	);

	// Now calculate the absolute position of each die based on shot coordinates + die
	// coordinates within shot. Assign a state based on whether it is partly or fully
	// outside the wafer
	const dieMap = shotPositions.reduce((acc: Die[], shotPosition, shotIndex) => {
		const dies = diesInShot.map((relativeDiePosition, dieIndex): Die => {
			let dieState: DieState = "good";
			const absoluteDieX = relativeDiePosition.x + shotPosition.x;
			const absoluteDieY = relativeDiePosition.y + shotPosition.y;
			const corners = getRectCorners(absoluteDieX, absoluteDieY, dieWidth, dieHeight);
			const radiusInsideLossyEdge = width / 2 - lossyEdgeWidth;
			const goodCorners = corners.filter(corner => isInsideCircle(corner.x, corner.y, width / 2, width / 2, radiusInsideLossyEdge));

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

		return [
			...acc,
			...dies,
		];
	}, []);

	// Randomly distribute n defective dies around the map based on fab yield
	let totalDies = dieMap.length;
	const numDefectiveDies = totalDies - Math.floor(fabYield * totalDies);
	const defectiveDieKeys = randomNumberSetFromRange(0, totalDies, numDefectiveDies);

	defectiveDieKeys.forEach((key) => {
		dieMap[key].dieState = "defective";
	});

	const {
		defectiveDies,
		partialDies,
		lostDies,
		goodDies,
	} = getDieStateCounts(dieMap.map((die) => die.dieState));

	return {
		dies: dieMap,
		totalDies,
		goodDies,
		defectiveDies,
		partialDies,
		lostDies,
		fabYield
	};
}

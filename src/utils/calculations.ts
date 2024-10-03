import { discSizes, panelSizes, yieldModels } from "../config";
import { DieState, FabResults } from "../types";
import { isInsideAnotherPath } from "fork-ts-checker-webpack-plugin/lib/utils/path/is-inside-another-path";
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

	const defects = criticalArea * defectRate / 100;
	return yieldModels[model].yield(defects);
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
	const { waferWidth, waferHeight } = panelSizes[selectedSize];

	const {
		x: offsetX,
		y: offsetY
	} = getDieOffset(inputVals, waferCenteringEnabled);

	const positions = rectanglesInRectangle(
		waferWidth,
		waferHeight,
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
			waferWidth - lossyEdgeWidth * 2,
			waferHeight - lossyEdgeWidth * 2
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
	selectedSize: keyof typeof discSizes,
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
	const { waferWidth } = discSizes[selectedSize];

	const {
		x: offsetX,
		y: offsetY
	} = getDieOffset(inputVals, waferCenteringEnabled);

	const positions = rectanglesInCircle(
		waferWidth,
		dieWidth,
		dieHeight,
		scribeHoriz,
		scribeVert,
		offsetX,
		offsetY
	);
	let totalDies = positions.length;
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
		const x = positions[i].x;
		const y = positions[i].y;

		const corners = getRectCorners(x, y, dieWidth, dieHeight);
		const radiusInsideLossyEdge = waferWidth / 2 - lossyEdgeWidth;
		const goodCorners = corners.filter(corner => isInsideCircle(corner.x, corner.y, waferWidth / 2, waferWidth / 2, radiusInsideLossyEdge));

		if (!goodCorners.length) {
			dieStates[i] = "lost";
		} else if (goodCorners.length < 4) {
			dieStates[i] = "partial";
		}

		dies[i] = {
			key: i,
			dieState: dieStates[i],
			x,
			y,
			width: dieWidth,
			height: dieHeight
		};
	}

	const {
		defectiveDies,
		partialDies,
		lostDies,
		goodDies,
	} = getDieStateCounts(dieStates);

	return {
		dies,
		totalDies,
		goodDies,
		defectiveDies,
		partialDies,
		lostDies,
		fabYield
	};
}

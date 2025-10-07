import { SubstrateShape } from "../types";
import { waferSizes, panelSizes, yieldModels } from "../config";
import {
	evaluateDiscInputs,
	evaluatePanelInputs,
	InputValues,
} from "./calculations";

interface OptimizationOptions {
	discSize: keyof typeof waferSizes;
	fieldHeight: number;
	fieldWidth: number;
	panelSize: keyof typeof panelSizes;
	reticleLimit: boolean;
	substrateShape: SubstrateShape;
	yieldModel: keyof typeof yieldModels;
}

interface OptimizationResult {
	optimalTransHoriz: number;
	optimalTransVert: number;
	maxGoodDies: number;
}

/**
 * Evaluate a single offset configuration and return the number of good dies
 */
function evaluateOffset(
	values: InputValues,
	options: OptimizationOptions
): number {
	let result;
	if (options.substrateShape === "Wafer") {
		result = evaluateDiscInputs(
			values,
			options.discSize,
			options.yieldModel,
			options.fieldWidth,
			options.fieldHeight,
			options.reticleLimit
		);
	} else {
		result = evaluatePanelInputs(
			values,
			options.panelSize,
			options.yieldModel,
			options.fieldWidth,
			options.fieldHeight,
			options.reticleLimit
		);
	}
	return result ? result.goodDies : 0;
}

export function optimizeDieOffset(
	values: InputValues,
	options: OptimizationOptions
): OptimizationResult {
	const { dieWidth, dieHeight } = values;

	// Offset is periodic with period equal to die dimensions
	const horizontalRange = [0, dieWidth];
	const verticalRange = [0, dieHeight];

	// Step size precision
	const horizontalStep = Math.min(0.1, dieWidth * 0.1);
	const verticalStep = Math.min(0.1, dieWidth * 0.1);

	let maxGoodDies = 0;
	let optimalTransHoriz = values.transHoriz;
	let optimalTransVert = values.transVert;

	// Optimize one dimension at a time (X then Y):

	// Step 1: Optimize horizontal offset while keeping vertical constant
	for (let transHoriz = horizontalRange[0]; transHoriz <= horizontalRange[1]; transHoriz += horizontalStep) {
		const testValues: InputValues = {
			...values,
			transHoriz: parseFloat(transHoriz.toFixed(3)),
			transVert: values.transVert
		};

		const goodDies = evaluateOffset(testValues, options);

		if (goodDies > maxGoodDies) {
			maxGoodDies = goodDies;
			optimalTransHoriz = testValues.transHoriz;
		}
	}

	// Step 2: Optimize vertical offset using the optimal horizontal offset
	for (let transVert = verticalRange[0]; transVert <= verticalRange[1]; transVert += verticalStep) {
		const testValues: InputValues = {
			...values,
			transHoriz: optimalTransHoriz,
			transVert: parseFloat(transVert.toFixed(3))
		};

		const goodDies = evaluateOffset(testValues, options);

		if (goodDies > maxGoodDies) {
			maxGoodDies = goodDies;
			optimalTransVert = testValues.transVert;
		}
	}

	return {
		optimalTransHoriz,
		optimalTransVert,
		maxGoodDies
	};
}

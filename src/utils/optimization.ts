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

	let maxGoodDies = 0;
	let optimalTransHoriz = values.transHoriz;
	let optimalTransVert = values.transVert;

	// Stage 1: Coarse grid search with 0.5mm step
	const coarseStep = 0.5;

	for (let transVert = -0.75 * dieHeight; transVert <= 0.75 * dieHeight; transVert += coarseStep) {
		for (let transHoriz = -0.75 * dieWidth; transHoriz <= 0.75 * dieWidth; transHoriz += coarseStep) {
			const testValues: InputValues = {
				...values,
				transHoriz: parseFloat(transHoriz.toFixed(3)),
				transVert: parseFloat(transVert.toFixed(3))
			};

			const goodDies = evaluateOffset(testValues, options);

			if (goodDies > maxGoodDies) {
				maxGoodDies = goodDies;
				optimalTransHoriz = testValues.transHoriz;
				optimalTransVert = testValues.transVert;
			}
		}
	}

	// Stage 2: Fine grid search with 0.1mm step around coarse optimum
	const fineStep = 0.1;
	const fineRadius = 1;

	const fineHorizMin = optimalTransHoriz - fineRadius;
	const fineHorizMax = optimalTransHoriz + fineRadius;
	const fineVertMin = optimalTransVert - fineRadius;
	const fineVertMax = optimalTransVert + fineRadius;

	for (let transVert = fineVertMin; transVert <= fineVertMax; transVert += fineStep) {
		for (let transHoriz = fineHorizMin; transHoriz <= fineHorizMax; transHoriz += fineStep) {
			const testValues: InputValues = {
				...values,
				transHoriz: parseFloat(transHoriz.toFixed(3)),
				transVert: parseFloat(transVert.toFixed(3))
			};

			const goodDies = evaluateOffset(testValues, options);

			if (goodDies > maxGoodDies) {
				maxGoodDies = goodDies;
				optimalTransHoriz = testValues.transHoriz;
				optimalTransVert = testValues.transVert;
			}
		}
	}

	return {
		optimalTransHoriz,
		optimalTransVert,
		maxGoodDies
	};
}

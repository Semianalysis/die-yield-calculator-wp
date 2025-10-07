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

export function optimizeDieOffset(
	values: InputValues,
	options: OptimizationOptions
): OptimizationResult {
	const { dieWidth, dieHeight } = values;

	// Define search ranges: -0.5 to +0.5 die width/height
	const horizontalRange = [-0.5 * dieWidth, 0.5 * dieWidth];
	const verticalRange = [-0.5 * dieHeight, 0.5 * dieHeight];

	// Use step size that balances precision with performance (0.1 die width/height)
	const horizontalStep = dieWidth * 0.1;
	const verticalStep = dieHeight * 0.1;

	let maxGoodDies = 0;
	let optimalTransHoriz = values.transHoriz;
	let optimalTransVert = values.transVert;

	// Iterate through the offset range
	for (let transHoriz = horizontalRange[0]; transHoriz <= horizontalRange[1]; transHoriz += horizontalStep) {
		for (let transVert = verticalRange[0]; transVert <= verticalRange[1]; transVert += verticalStep) {
			// Create new input values with current offset
			const testValues: InputValues = {
				...values,
				transHoriz: parseFloat(transHoriz.toFixed(3)),
				transVert: parseFloat(transVert.toFixed(3))
			};

			// Calculate results for these offset values
			let result;
			if (options.substrateShape === "Wafer") {
				result = evaluateDiscInputs(
					testValues,
					options.discSize,
					options.yieldModel,
					options.fieldWidth,
					options.fieldHeight,
					options.reticleLimit
				);
			} else {
				result = evaluatePanelInputs(
					testValues,
					options.panelSize,
					options.yieldModel,
					options.fieldWidth,
					options.fieldHeight,
					options.reticleLimit
				);
			}

			// Check if this configuration produces more good dies
			if (result && result.goodDies > maxGoodDies) {
				maxGoodDies = result.goodDies;
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
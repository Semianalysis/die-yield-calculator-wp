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
 * Evaluate a single offset configuration and return the number of dies fully
 * on the wafer (pre-defect). Using goodDies + defectiveDies (i.e. all dies
 * with 4 corners inside the wafer boundary) rather than post-defect goodDies
 * gives a more stable objective: defect rounding can make post-defect counts
 * identical for configurations with different placement quality.
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
	return result ? result.goodDies + result.defectiveDies : 0;
}

/**
 * Perform a grid search over a 2D range of translation offsets,
 * returning the offset that maximizes good die count.
 */
function gridSearch(
	values: InputValues,
	options: OptimizationOptions,
	minX: number,
	maxX: number,
	stepX: number,
	minY: number,
	maxY: number,
	stepY: number,
	bestSoFar: OptimizationResult
): OptimizationResult {
	let { maxGoodDies, optimalTransHoriz, optimalTransVert } = bestSoFar;

	for (let transVert = minY; transVert <= maxY; transVert += stepY) {
		for (let transHoriz = minX; transHoriz <= maxX; transHoriz += stepX) {
			const testValues: InputValues = {
				...values,
				transHoriz: parseFloat(transHoriz.toFixed(4)),
				transVert: parseFloat(transVert.toFixed(4))
			};

			const goodDies = evaluateOffset(testValues, options);

			if (goodDies > maxGoodDies) {
				maxGoodDies = goodDies;
				optimalTransHoriz = testValues.transHoriz;
				optimalTransVert = testValues.transVert;
			}
		}
	}

	return { maxGoodDies, optimalTransHoriz, optimalTransVert };
}

/**
 * Compute the search period for optimization based on the placement mode.
 *
 * In reticle-limited mode, the shot grid has period equal to the trimmed
 * field dimensions (dies packed into the reticle with waste trimmed). The
 * old algorithm searched only ±0.5×dieWidth, which for small dies in large
 * reticle fields covered as little as 8% of the actual period.
 *
 * In non-reticle mode, the effective period is the die pitch.
 */
function getSearchPeriod(
	values: InputValues,
	options: OptimizationOptions
): { periodX: number; periodY: number } {
	const diePitchX = values.dieWidth + values.scribeHoriz;
	const diePitchY = values.dieHeight + values.scribeVert;

	if (options.reticleLimit) {
		// Trimmed field width = numCols × diePitch (shot waste removed)
		const numCols = Math.floor(options.fieldWidth / diePitchX);
		const numRows = Math.floor(options.fieldHeight / diePitchY);
		return {
			periodX: Math.max(diePitchX, numCols * diePitchX),
			periodY: Math.max(diePitchY, numRows * diePitchY)
		};
	}

	return { periodX: diePitchX, periodY: diePitchY };
}

/**
 * Three-stage optimization to find the translation offset that maximizes
 * the number of good dies on a wafer or panel.
 *
 * Improvements over the previous two-stage approach:
 * 1. Correct search period: uses shot pitch for reticle-limited mode instead
 *    of die pitch, covering the full optimization space.
 * 2. Adaptive step sizes: scales with the period so both tiny (2mm) and
 *    large (68mm) dies get appropriate resolution.
 * 3. Three stages: coarse (full period) → fine (±1 coarse step) →
 *    ultra-fine (±1 fine step), reaching ~16μm precision for typical dies.
 */
export function optimizeDieOffset(
	values: InputValues,
	options: OptimizationOptions
): OptimizationResult {
	const { periodX, periodY } = getSearchPeriod(values, options);

	// ~25 steps per dimension keeps each stage at ~625 evaluations
	const stepsPerDim = 25;
	const coarseStepX = Math.max(0.01, periodX / stepsPerDim);
	const coarseStepY = Math.max(0.01, periodY / stepsPerDim);

	// Seed the search with the current offset so the optimizer always
	// returns a result at least as good as the starting position
	const initialGoodDies = evaluateOffset(values, options);
	let best: OptimizationResult = {
		maxGoodDies: initialGoodDies,
		optimalTransHoriz: values.transHoriz,
		optimalTransVert: values.transVert
	};

	// Stage 1: Coarse search over one full period
	best = gridSearch(
		values, options,
		-periodX / 2, periodX / 2, coarseStepX,
		-periodY / 2, periodY / 2, coarseStepY,
		best
	);

	// Stage 2: Fine search - ±1 coarse step around the coarse optimum
	const fineStepX = coarseStepX / 5;
	const fineStepY = coarseStepY / 5;

	best = gridSearch(
		values, options,
		best.optimalTransHoriz - coarseStepX, best.optimalTransHoriz + coarseStepX, fineStepX,
		best.optimalTransVert - coarseStepY, best.optimalTransVert + coarseStepY, fineStepY,
		best
	);

	// Stage 3: Ultra-fine search - ±1 fine step around the fine optimum
	const ultraFineStepX = fineStepX / 5;
	const ultraFineStepY = fineStepY / 5;

	best = gridSearch(
		values, options,
		best.optimalTransHoriz - fineStepX, best.optimalTransHoriz + fineStepX, ultraFineStepX,
		best.optimalTransVert - fineStepY, best.optimalTransVert + fineStepY, ultraFineStepY,
		best
	);

	return best;
}

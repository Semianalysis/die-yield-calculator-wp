import { discSizes, panelSizes, yieldModels } from "../config";
import { FabResults } from "../types";

/**
 * Determine whether a target position (x, y) is inside or outside a circle
 * drawn from a center point (centerX, centerY) and extends outward to a given
 * size (radius)
 * @param x horizontal position of the target
 * @param y vertical position of the target
 * @param centerX horizontal center of the circle
 * @param centerY vertical center of the circle
 * @param radius size of the circle
 */
export function isInsideCircle(x: number, y: number, centerX: number, centerY: number, radius: number) {
	return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}

/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit fully inside it, without
 * overlapping the edges
 * @param diameter size of the circle
 * @param rectWidth width of each rectangle
 * @param rectHeight height of each rectangle
 */
export function rectanglesInCircle(diameter: number, rectWidth: number, rectHeight: number) {
	const radius = diameter / 2;
	const centerX = radius;
	const centerY = radius;
	let positions = [];

	for (let x = 0; x <= diameter + rectWidth; x += rectWidth) {
		for (let y = 0; y <= diameter + rectHeight; y += rectHeight) {
			const corners = [
				{ x: x, y: y },
				{ x: x + rectWidth, y: y },
				{ x: x, y: y + rectHeight },
				{ x: x + rectWidth, y: y + rectHeight }
			];

			if (corners.every(corner => isInsideCircle(corner.x, corner.y, centerX, centerY, radius))) {
				positions.push({ x: x, y: y });
			}
		}
	}
	return positions;
}


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

export type InputValues = {
	dieWidth: number;
	dieHeight: number;
	criticalArea: number;
	defectRate: number;
	lossyEdgeWidth: number;
	scribeHoriz: number;
	scribeVert: number;
};

export function evaluatePanelInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof panelSizes,
	selectedModel: keyof typeof yieldModels
): FabResults {
	const {
		dieWidth,
		dieHeight,
		criticalArea,
		defectRate,
		scribeHoriz,
		scribeVert
	} = inputVals;
	let dies = [];
	const fabYield = getFabYield(defectRate, criticalArea, selectedModel);
	const { waferWidth, waferHeight } = panelSizes[selectedSize];
	const adjustedDieWidth = dieWidth + scribeHoriz * 2;
	const adjustedDieHeight = dieHeight + scribeVert * 2;

	const diesPerRow = Math.floor(waferWidth / adjustedDieWidth);
	const diesPerColumn = Math.floor(waferHeight / adjustedDieHeight);

	const centerHorz = (waferWidth - adjustedDieWidth * diesPerRow) / 2;
	const centerVert = (waferHeight - adjustedDieHeight * diesPerColumn) / 2;

	const countWidth = Math.floor(waferWidth / (dieWidth + scribeHoriz * 2));
	const countHeight = Math.floor(waferHeight / (dieHeight + scribeVert * 2));

	const totalDies = countWidth * countHeight;

	const goodDies = Math.floor(fabYield * totalDies);

	let dieStates = new Array(totalDies).fill("defective");
	for (let i = 0; i < goodDies; i++) {
		dieStates[i] = "good";
	}

	for (let i = dieStates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dieStates[i], dieStates[j]] = [dieStates[j], dieStates[i]];
	}

	for (let i = 0; i < dieStates.length; i++) {
		const row = Math.floor(i / diesPerRow);
		const col = i % diesPerRow;

		const dieState = dieStates[i];

		const x = col * adjustedDieWidth + centerHorz;
		const y = row * adjustedDieHeight + centerVert;

		dies[i] = {
			key: i,
			dieState,
			x,
			y,
			width: dieWidth,
			height: dieHeight
		};
	}

	return {
		dies,
		totalDies,
		goodDies,
		fabYield,
	};
}

export function evaluateDiscInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof discSizes,
	selectedModel: keyof typeof yieldModels
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

	let positions = rectanglesInCircle(waferWidth, dieWidth + scribeHoriz * 2, dieHeight + scribeVert * 2);
	let totalDies = positions.length;

	const goodDies = Math.floor(fabYield * totalDies);

	let dieStates = new Array(totalDies).fill("defective");
	for (let i = 0; i < goodDies; i++) {
		dieStates[i] = "good";
	}

	for (let i = dieStates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dieStates[i], dieStates[j]] = [dieStates[j], dieStates[i]];
	}

	for (let i = 0; i < dieStates.length; i++) {
		const x = positions[i].x;
		const y = positions[i].y;

		const corners = [
			{ x: x, y: y },
			{ x: x + dieWidth, y: y },
			{ x: x, y: y + dieHeight },
			{ x: x + dieWidth, y: y + dieHeight }
		];

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

	return {
		dies,
		totalDies,
		goodDies,
		fabYield,
	};
}

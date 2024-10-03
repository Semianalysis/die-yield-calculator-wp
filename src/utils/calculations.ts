import { discSizes, panelSizes, yieldModels } from "../config";
import { DieState, FabResults } from "../types";
import { isInsideAnotherPath } from "fork-ts-checker-webpack-plugin/lib/utils/path/is-inside-another-path";

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
 * Determine whether coordinates are inside a rectangle of given coordinates and size
 * @param x horizontal position of the target
 * @param y vertical position of the target
 * @param rectangleX horizontal position of the rectangle top-left corner
 * @param rectangleY vertical position of the rectangle top-left corner
 * @param rectangleWidth
 * @param rectangleHeight
 */
export function isInsideRectangle(
	x: number,
	y: number,
	rectangleX: number,
	rectangleY: number,
	rectangleWidth: number,
	rectangleHeight: number
) {
	return (
		x > rectangleX &&
		x < rectangleX + rectangleWidth &&
		y > rectangleY &&
		y < rectangleY + rectangleHeight
	);
}

type Rectangle = { x: number, y: number };

/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit fully inside it, without
 * overlapping the edges
 * @param diameter size of the circle
 * @param rectWidth width of each rectangle
 * @param rectHeight height of each rectangle
 * @param centering should the rectangles be symmetrical?
 */
export function rectanglesInCircle(
	diameter: number,
	rectWidth: number,
	rectHeight: number,
	centering: boolean
): Rectangle[] {
	const radius = diameter / 2;
	const rectangles: Rectangle[] = [];

	const offsetX = centering ? rectWidth * -0.5 : 0;
	const offsetY = centering ? rectHeight * -0.5 : 0;

	let count = 0;

	// Traverse each row, starting at the center
	for (let y = 0; y <= radius; y += rectHeight) {
		// Traverse each column, starting at the center
		for (let x = 0; x <= radius; x += rectWidth) {
			// Draw four rectangles, one going in each direction (n, e, s, w)
			for(let i = 0; i < 4; i++) {
				const rectX = i % 2 === 0 ? x : -x - rectWidth;
				const rectY = i % 3 === 0 ? y : -y - rectHeight;
				// Apply the offset - used for centering
				const offsetRectX = rectX + offsetX;
				const offsetRectY = rectY + offsetY;
				const corners = getDieCorners(
					offsetRectX,
					offsetRectY,
					rectWidth,
					rectHeight
				);
				const cornersWithinCircle = corners.filter((corner) => isInsideCircle(corner.x, corner.y, 0, 0, radius))

				// If the rectangle fits within the circle, add it to the result
				if (cornersWithinCircle.length === 4) {
					rectangles.push({
						// Add the radius back to the final coordinates so all are positive integers
						x: offsetRectX + radius,
						y: offsetRectY + radius,
					});
				}
			}
		}
	}

	console.log({count})

	return rectangles;
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

function getDieStateCounts(dieStates: Array<DieState>) {
	let defectiveDies = 0;
	let partialDies = 0;
	let lostDies = 0;
	dieStates.forEach((dieState) => {
		switch (dieState) {
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
		scribeVert,
		lossyEdgeWidth
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
		const x = col * adjustedDieWidth + centerHorz;
		const y = row * adjustedDieHeight + centerVert;

		const corners = getDieCorners(x, y, dieWidth, dieHeight);
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
			x,
			y,
			width: dieWidth,
			height: dieHeight
		};
	}

	const {
		defectiveDies,
		partialDies,
		lostDies
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

function getDieCorners(
	dieX: number,
	dieY: number,
	dieWidth: number,
	dieHeight: number
) {
	return [
		{
			// top left
			x: dieX,
			y: dieY
		},
		{
			// top right
			x: dieX + dieWidth,
			y: dieY
		},
		{
			// bottom left
			x: dieX,
			y: dieY + dieHeight
		},
		{
			// bottom right
			x: dieX + dieWidth,
			y: dieY + dieHeight
		}
	];
}

export function evaluateDiscInputs(
	inputVals: InputValues,
	selectedSize: keyof typeof discSizes,
	selectedModel: keyof typeof yieldModels,
	dieCenteringEnabled: boolean,
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

	let positions = rectanglesInCircle(
		waferWidth,
		dieWidth + scribeHoriz * 2,
		dieHeight + scribeVert * 2,
		dieCenteringEnabled
	);
	let totalDies = positions.length;

	console.log({totalDies});

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

		const corners = getDieCorners(x, y, dieWidth, dieHeight);
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
		lostDies
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

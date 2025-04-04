import { Position } from "../types";

/**
 * Calculate the coordinates of all four corners of a rectangle, given a starting
 * point and its dimensions.
 * @param x horizontal coordinate of rectangle's top-left corner
 * @param y vertical coordinate of rectangle's top-left corner
 * @param width width of rectangle
 * @param height height of rectangle
 */
export function getRectCorners(
	x: number,
	y: number,
	width: number,
	height: number,
) {
	return [
		{
			// top left
			x: x,
			y: y,
		},
		{
			// top right
			x: x + width,
			y: y,
		},
		{
			// bottom left
			x: x,
			y: y + height,
		},
		{
			// bottom right
			x: x + width,
			y: y + height,
		},
	];
}

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
export function isInsideCircle(
	x: number,
	y: number,
	centerX: number,
	centerY: number,
	radius: number,
) {
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
	rectangleHeight: number,
) {
	return (
		x >= rectangleX &&
		x <= rectangleX + rectangleWidth &&
		y >= rectangleY &&
		y <= rectangleY + rectangleHeight
	);
}

/**
 * Determines if one rectangle is inside another, i.e. it overlaps with the outer
 * rectangle. A partial overlap (>0 corners inside the outer rectangle) is allowed if
 * `allowPartial` is true.
 * @param innerRectX top left x coordinate of inner rectangle
 * @param innerRectY top left y coordinate of inner rectangle
 * @param innerRectWidth width of inner rectangle
 * @param innerRectHeight height of outer rectangle
 * @param outerRectX top left x coordinate of outer rectangle
 * @param outerRectY top left y coordinate of outer rectangle
 * @param outerRectWidth width of outer rectangle
 * @param outerRectHeight height of outer rectangle
 * @param allowPartial returns true if only part of the inner rectangle overlaps the outer
 */
function rectangleIsInsideRectangle(
	innerRectX: number,
	innerRectY: number,
	innerRectWidth: number,
	innerRectHeight: number,
	outerRectX: number,
	outerRectY: number,
	outerRectWidth: number,
	outerRectHeight: number,
	allowPartial: boolean,
) {
	const innerRectCorners = getRectCorners(
		innerRectX,
		innerRectY,
		innerRectWidth,
		innerRectHeight,
	);
	const cornersInsideOuterRectangle = innerRectCorners.filter((corner) =>
		isInsideRectangle(
			corner.x,
			corner.y,
			outerRectX,
			outerRectY,
			outerRectWidth,
			outerRectHeight,
		),
	);

	if (allowPartial) {
		// Filter out corners that are on the edge of the outer rectangle
		const nonEdgeCornersInsideOuterRect = cornersInsideOuterRectangle.filter(
			(corner) => {
				if (
					corner.x === outerRectX ||
					corner.x === outerRectX + outerRectWidth ||
					corner.y === outerRectY ||
					corner.y === outerRectY + outerRectHeight
				) {
					return false;
				}

				return true;
			},
		);

		return nonEdgeCornersInsideOuterRect.length > 0;
	}

	return cornersInsideOuterRectangle.length === 4;
}

/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit inside it
 *
 * @param diameter size of the circle
 * @param rectWidth width of each rectangle
 * @param rectHeight height of each rectangle
 * @param gapX horizontal space between each rectangle
 * @param gapY vertical space between each rectangle
 * @param offsetX amount by which to offset each rectangle horizontally
 * @param offsetY amount by which to offset each rectangle vertically
 * @param includePartials whether to include rectangles that overlap the circle edge
 */
export function rectanglesInCircle(
	diameter: number,
	rectWidth: number,
	rectHeight: number,
	gapX: number,
	gapY: number,
	offsetX: number,
	offsetY: number,
	includePartials: boolean,
): Position[] {
	const radius = diameter / 2;
	const positions: Position[] = [];

	// Traverse each row, starting at the center
	for (let y = 0; y <= radius; y += rectHeight + gapY) {
		// Traverse each column, starting at the center
		for (let x = 0; x <= radius; x += rectWidth + gapX) {
			// Draw four rectangles, one in each quadrant (se, sw, nw, ne)
			for (let i = 0; i < 4; i++) {
				const rectX = i % 2 === 0 ? x : -x - rectWidth - gapX;
				const rectY = i % 3 === 0 ? y : -y - rectHeight - gapY;
				// Apply the offset - used for centering
				const offsetRectX = rectX + offsetX;
				const offsetRectY = rectY + offsetY;
				const corners = getRectCorners(
					offsetRectX,
					offsetRectY,
					rectWidth,
					rectHeight,
				);
				const cornersWithinCircle = corners.filter((corner) =>
					isInsideCircle(corner.x, corner.y, 0, 0, radius),
				);

				// If partials are allowed, only one corner must overlap, otherwise all must.
				// Note that technically a square could overlap a circle without any corners
				// being within the circle. However given the scales we are working with and
				// the complexity of the maths involved in calculating this, we are not
				// accounting for that possibility here.
				const minOverlappingCorners = includePartials ? 1 : 4;

				// If the rectangle fits within the circle, add it to the result
				if (cornersWithinCircle.length >= minOverlappingCorners) {
					positions.push({
						// Add the radius back to the final coordinates so all are positive integers
						x: offsetRectX + radius,
						y: offsetRectY + radius,
					});
				}
			}
		}
	}

	return positions;
}

/**
 * Given a rectangle with the provided dimensions, determine the maximum number of
 * smaller rectangles of a given width and height that would fit fully inside it.
 * @param outerRectWidth width of the big rectangle
 * @param outerRectHeight height of the big rectangle
 * @param innerRectWidth width of each smaller rectangle
 * @param innerRectHeight height of each smaller rectangle
 * @param gapX horizontal space between each rectangle
 * @param gapY vertical space between each rectangle
 * @param offsetX amount by which to offset each rectangle horizontally
 * @param offsetY amount by which to offset each rectangle vertically
 * @param center if true, center align inner and outer rectangles. otherwise, align top-left
 * @param includePartials include inner rectangles that only partially overlap with the outer rectangle
 * @returns an object containing the positions of the inner rectangles, as well as the number of rows and columns
 */
export function rectanglesInRectangle(
	outerRectWidth: number,
	outerRectHeight: number,
	innerRectWidth: number,
	innerRectHeight: number,
	gapX: number,
	gapY: number,
	offsetX: number,
	offsetY: number,
	center: boolean,
	includePartials: boolean,
): {
	positions: Array<Position>;
	numRows: number;
	numCols: number;
} {
	const positions: Array<Position> = [];

	// Adjust the effective size of inner rectangles including gaps split evenly on both sides
	const effectiveWidth = innerRectWidth + gapX;
	const effectiveHeight = innerRectHeight + gapY;
	const halfGapX = gapX / 2;
	const halfGapY = gapY / 2;

	// Compute the number of inner rectangles that can fit in each direction
	const countX = Math.floor(outerRectWidth / effectiveWidth);
	const countY = Math.floor(outerRectHeight / effectiveHeight);

	// If center alignment is enabled, calculate the padding to center the rectangles
	let startX = 0;
	let startY = 0;
	if (center) {
		const totalInnerWidth = countX * effectiveWidth - gapX;
		const totalInnerHeight = countY * effectiveHeight - gapY;
		startX = (outerRectWidth - totalInnerWidth) / 2;
		startY = (outerRectHeight - totalInnerHeight) / 2;
	}

	let numRows = 0;
	let numCols = 0;

	// Iterate through potential positions and calculate coordinates
	for (let row = 0; row <= countY; row++) {
		for (let col = 0; col <= countX; col++) {
			const x = startX + col * effectiveWidth + offsetX + halfGapX;
			const y = startY + row * effectiveHeight + offsetY + halfGapY;

			const isInside = rectangleIsInsideRectangle(
				x,
				y,
				innerRectWidth,
				innerRectHeight,
				0,
				0,
				outerRectWidth,
				outerRectHeight,
				includePartials,
			);

			if (isInside) {
				positions.push({ x, y });
				numRows = row + 1;
				numCols = col + 1;
			}
		}
	}

	return {
		positions,
		numRows,
		numCols,
	};
}

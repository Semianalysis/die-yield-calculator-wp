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
	height: number
) {
	return [
		{
			// top left
			x: x,
			y: y
		},
		{
			// top right
			x: x + width,
			y: y
		},
		{
			// bottom left
			x: x,
			y: y + height
		},
		{
			// bottom right
			x: x + width,
			y: y + height
		}
	];
}

/**
 * Calculate the center point of a rectangle, given a starting point and its dimensions.
 * @param x
 * @param y
 * @param width
 * @param height
 */
export function getRectCenter(
	x: number,
	y: number,
	width: number,
	height: number
) {
	return {
		x: x + width / 2,
		y: y + height / 2
	};
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
	radius: number
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
	rectangleHeight: number
) {
	return (
		x >= rectangleX &&
		x <= rectangleX + rectangleWidth &&
		y >= rectangleY &&
		y <= rectangleY + rectangleHeight
	);
}

/**
 * Determines if one rectangle is inside another, i.e. its corners and center overlap
 * with the outer rectangle. A partial overlap (>0 corners inside the outer
 * rectangle) is allowed if `allowPartial` is true.
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
	allowPartial: boolean
) {
	const innerRectCorners = getRectCorners(
		innerRectX,
		innerRectY,
		innerRectWidth,
		innerRectHeight
	);
	const innerRectCenter = getRectCenter(
		innerRectX,
		innerRectY,
		innerRectWidth,
		innerRectHeight
	);
	const pointsInsideOuterRectangle = [...innerRectCorners, innerRectCenter].filter((point) =>
		isInsideRectangle(
			point.x,
			point.y,
			outerRectX,
			outerRectY,
			outerRectWidth,
			outerRectHeight
		)
	);

	if (allowPartial) {
		// Filter out corners that are on the edge of the outer rectangle
		const nonEdgeCornersInsideOuterRect = pointsInsideOuterRectangle.filter(
			(point) => {
				if (
					point.x === outerRectX ||
					point.x === outerRectX + outerRectWidth ||
					point.y === outerRectY ||
					point.y === outerRectY + outerRectHeight
				) {
					return false;
				}

				return true;
			}
		);

		return nonEdgeCornersInsideOuterRect.length > 0;
	}

	return pointsInsideOuterRectangle.length === 5;
}

/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit inside it.
 *
 * Uses a full-grid scan rather than quadrant mirroring. This correctly handles
 * non-zero offsets where the quadrant approach could miss valid positions near
 * the circle edge (the old loop range of 0..radius was insufficient when
 * offsets shifted the grid asymmetrically).
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
	const stepX = rectWidth + gapX;
	const stepY = rectHeight + gapY;
	const positions: Position[] = [];

	// Compute the full range of grid indices whose rectangles could overlap
	// with the circle. Grid positions are in circle-centered coordinates
	// (origin at center of circle), then shifted by +radius for output.
	const minCol = Math.floor((-radius - offsetX - rectWidth) / stepX);
	const maxCol = Math.ceil((radius - offsetX) / stepX);
	const minRow = Math.floor((-radius - offsetY - rectHeight) / stepY);
	const maxRow = Math.ceil((radius - offsetY) / stepY);

	// If partials are allowed, only one point must overlap, otherwise all must.
	const minOverlappingPoints = includePartials ? 1 : 5;

	for (let row = minRow; row <= maxRow; row++) {
		for (let col = minCol; col <= maxCol; col++) {
			const x = col * stepX + offsetX;
			const y = row * stepY + offsetY;

			const corners = getRectCorners(x, y, rectWidth, rectHeight);
			const center = getRectCenter(x, y, rectWidth, rectHeight);
			const pointsWithinCircle = [...corners, center].filter((point) =>
				isInsideCircle(point.x, point.y, 0, 0, radius)
			);

			// If the rectangle fits within the circle, add it to the result
			if (pointsWithinCircle.length >= minOverlappingPoints) {
				positions.push({
					// Add the radius back to the final coordinates so all are positive
					x: x + radius,
					y: y + radius
				});
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
	includePartials: boolean
): {
	positions: Array<Position>,
	numRows: number,
	numCols: number
}{
	const positions: Array<Position> = [];

	// Adjust the effective size of inner rectangles including gaps split evenly on both sides
	const effectiveWidth = innerRectWidth + gapX;
	const effectiveHeight = innerRectHeight + gapY;
	const halfGapX = gapX / 2;
	const halfGapY = gapY / 2;

	// Compute the number of inner rectangles that can fit in each direction
	let countX = Math.floor(outerRectWidth / effectiveWidth);
	let countY = Math.floor(outerRectHeight / effectiveHeight);

	// If center alignment is enabled, calculate the padding to center the rectangles
	let startX = halfGapX;
	let startY = halfGapY;
	if (center) {
		// Attempt to fit one more rectangle in each direction when centering is enabled
		countX += 2;
		countY += 2;
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
			const x = startX + (col * effectiveWidth) + offsetX;
			const y = startY + (row * effectiveHeight) + offsetY;

			const isInside = rectangleIsInsideRectangle(
				x,
				y,
				innerRectWidth,
				innerRectHeight,
				0,
				0,
				outerRectWidth,
				outerRectHeight,
				includePartials
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

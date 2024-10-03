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
		x >= rectangleX &&
		x <= rectangleX + rectangleWidth &&
		y >= rectangleY &&
		y <= rectangleY + rectangleHeight
	);
}

type Position = { x: number, y: number };

/**
 * Given a circle with the provided diameter, determine the maximum number of
 * rectangles of a given width and height would fit fully inside it, without
 * overlapping the edges
 * @param diameter size of the circle
 * @param rectWidth width of each rectangle
 * @param rectHeight height of each rectangle
 * @param gapX horizontal space between each rectangle
 * @param gapY vertical space between each rectangle
 * @param offsetX amount by which to offset each rectangle horizontally
 * @param offsetY amount by which to offset each rectangle vertically
 */
export function rectanglesInCircle(
	diameter: number,
	rectWidth: number,
	rectHeight: number,
	gapX: number,
	gapY: number,
	offsetX: number,
	offsetY: number
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
					rectHeight
				);
				const cornersWithinCircle = corners.filter((corner) => isInsideCircle(corner.x, corner.y, 0, 0, radius));

				// If the rectangle fits within the circle, add it to the result
				if (cornersWithinCircle.length === 4) {
					positions.push({
						// Add the radius back to the final coordinates so all are positive integers
						x: offsetRectX + radius,
						y: offsetRectY + radius
					});
				}
			}
		}
	}

	return positions;
}

/**
 * Given a rectangle with the provided dimensions, determine the maximum number of
 * smaller rectangles of a given width and height would fit fully inside it.
 * @param outerRectWidth width of the big rectangle
 * @param outerRectHeight height of the big rectangle
 * @param innerRectWidth width of each smaller rectangle
 * @param innerRectHeight height of each smaller rectangle
 * @param gapX horizontal space between each rectangle
 * @param gapY vertical space between each rectangle
 * @param offsetX amount by which to offset each rectangle horizontally
 * @param offsetY amount by which to offset each rectangle vertically
 */
export function rectanglesInRectangle(
	outerRectWidth: number,
	outerRectHeight: number,
	innerRectWidth: number,
	innerRectHeight: number,
	gapX: number,
	gapY: number,
	offsetX: number,
	offsetY: number
): Position[] {
	const positions: Position[] = [];

	// Traverse each row, starting at the center
	for (let y = 0; y <= outerRectHeight / 2; y += innerRectHeight + gapY) {
		// Traverse each column, starting at the center
		for (let x = 0; x <= outerRectWidth / 2; x += innerRectWidth + gapX) {
			// Draw four rectangles, one in each quadrant (se, sw, nw, ne)
			for (let i = 0; i < 4; i++) {
				const rectX = i % 2 === 0 ? x : -x - innerRectWidth - gapX;
				const rectY = i % 3 === 0 ? y : -y - innerRectHeight - gapY;
				// Apply the offset - used for centering
				const offsetRectX = rectX + offsetX;
				const offsetRectY = rectY + offsetY;
				const corners = getRectCorners(
					offsetRectX,
					offsetRectY,
					innerRectWidth,
					innerRectHeight
				);
				const cornersWithinRectangle = corners.filter(
					(corner) => isInsideRectangle(
						corner.x,
						corner.y,
						outerRectWidth * -0.5,
						outerRectHeight * -0.5,
						outerRectWidth,
						outerRectHeight
					)
				);

				// If the rectangle fits within the circle, add it to the result
				if (cornersWithinRectangle.length === 4) {
					positions.push({
						// Add half the width/height back to the final coordinates so all are positive integers
						x: offsetRectX + outerRectWidth / 2,
						y: offsetRectY + outerRectHeight / 2
					});
				}
			}
		}
	}

	return positions;
}

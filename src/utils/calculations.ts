import {YIELDMODELS} from '../components/App';

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
export function getFabYield(defectRate: number, criticalArea: number, model: keyof typeof YIELDMODELS) {
	if (!defectRate) {
		return 1;
	}

	const defects = criticalArea * defectRate / 100;
	switch (model) {
		case ("poisson"):
			return Math.exp(-defects);
		case ("murphy"):
			return Math.pow(((1 - Math.exp(-defects)) / defects), 2);
		case ("rect"):
			return (1 - Math.exp(-2 * defects)) / (2 * defects);
		//case ('moore'):
			//  return Math.exp(Math.sqrt(-defects));
		case ("seeds"):
			return 1 / (1 + defects);
		default:
			return 0;
	}
}

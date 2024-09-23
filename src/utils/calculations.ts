import {YIELDMODELS} from '../components/App';

export function isInsideCircle(x: number, y: number, centerX: number, centerY: number, radius: number) {
	return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}

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


export function getFabYield(defectRate: number, criticalArea: number, model: keyof typeof YIELDMODELS) {
	const defects = criticalArea * defectRate / 100;
	switch (model) {
		case ("poisson"):
			return Math.exp(-defects);
		case ("murph"):
			return Math.pow(((1 - Math.exp(-defects)) / defects), 2);
		case ("rect"):
			return (1 - Math.exp(-2 * defects)) / (2 * defects);
		//case ('moore'):
		//  return Math.exp(Math.sqrt(-defects));
		case ("seeds"):
			return 1 / (1 + defects);
		default:
			console.log("Invalid Model.");
			return 0;
	}
}

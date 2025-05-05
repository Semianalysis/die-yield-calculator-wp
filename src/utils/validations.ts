import { InputValues } from "./calculations";
import { minDieEdge } from "../config";

const validPositiveNumber = (value: number) => !isNaN(value) && value >= 0;

// Validation function returns a message if the input is invalid, or undefined if it's valid
type Validator = (
	inputs: InputValues,
	fieldSize: {
		fieldWidth: number;
		fieldHeight: number;
	},
	waferSize: {
		waferWidth: number;
		waferHeight: number;
	}
) => string | undefined;

/**
 * Validate the die width and horizontal scribe line width
 * @param dieWidth
 * @param scribeHoriz
 * @param fieldWidth
 * @param waferWidth
 */
const dieWidthAndHorizontalScribe: Validator = (
	{ dieWidth, scribeHoriz },
	{ fieldWidth },
	{ waferWidth },
) => {
	if (!validPositiveNumber(dieWidth)) {
		return "Invalid die width";
	}

	if (!validPositiveNumber(scribeHoriz)) {
		return "Invalid horizontal scribe line width";
	}

	if (dieWidth < minDieEdge) {
		return `Die must be at least ${minDieEdge}mm wide`;
	}

	if (dieWidth + scribeHoriz > waferWidth) {
		return `Die and scribe line width must be less than or equal to the wafer width (${waferWidth}mm).`;
	}

	if (dieWidth + scribeHoriz > fieldWidth) {
		return `Die and scribe line width must be less than or equal to the field width (${fieldWidth}mm). Reduce the total width or disable Reticle Limit.`;
	}
};

/**
 * Validate the die height and vertical scribe line width
 * @param dieHeight
 * @param scribeVert
 * @param fieldHeight
 * @param waferHeight
 */
const dieHeightAndVerticalScribe: Validator = (
	{ dieHeight, scribeVert },
	{ fieldHeight },
	{ waferHeight },
) => {
	if (!validPositiveNumber(dieHeight)) {
		return "Invalid die height";
	}

	if (!validPositiveNumber(scribeVert)) {
		return "Invalid vertical scribe line width";
	}

	if (dieHeight < minDieEdge) {
		return `Die must be at least ${minDieEdge}mm tall`;
	}

	if (dieHeight + scribeVert > waferHeight) {
		return `Die and scribe line height must be less than or equal to the wafer height (${waferHeight}mm).`;
	}

	if (dieHeight + scribeVert > fieldHeight) {
		return `Die and scribe line height must be less than or equal to the field height (${fieldHeight}mm). Reduce the total height or disable Reticle Limit.`;
	}
};

export const validations: { [k in keyof InputValues]: Validator } = {
	dieWidth: dieWidthAndHorizontalScribe,
	dieHeight: dieHeightAndVerticalScribe,
	criticalArea: ({ criticalArea, dieHeight, dieWidth }) => {
		if (!validPositiveNumber(criticalArea)) {
			return "Invalid critical area";
		}

		if (criticalArea > dieWidth * dieHeight) {
			return "Critical area must be less than or equal to die area";
		}
	},
	criticalLayers: ({ criticalLayers }) => {
		if (isNaN(criticalLayers) || criticalLayers < 1 || criticalLayers > 100) {
			return "Invalid critical layer count";
		}
	},
	defectRate: ({ defectRate }) => {
		if (!validPositiveNumber(defectRate)) {
			return "Invalid defect rate";
		}
	},
	lossyEdgeWidth: ({ lossyEdgeWidth }) => {
		if (!validPositiveNumber(lossyEdgeWidth)) {
			return "Invalid lossy edge width";
		}
	},
	notchKeepOutHeight: ({ notchKeepOutHeight }) => {
		if (!validPositiveNumber(notchKeepOutHeight)) {
			return "Invalid notch keep-out height";
		}
	},
	scribeHoriz: dieWidthAndHorizontalScribe,
	scribeVert: dieHeightAndVerticalScribe,
	transHoriz: ({ transHoriz }) => {
		if (isNaN(transHoriz)) {
			return "Invalid horizontal translation";
		}
	},
	transVert: ({ transVert }) => {
		if (isNaN(transVert)) {
			return "Invalid vertical translation";
		}
	},
	manualYield: ({ manualYield }) => {
		if (
			!validPositiveNumber(manualYield) ||
			manualYield > 100 ||
			manualYield < 0
		) {
			return "Manual yield % must be a number from 0-100";
		}
	},
	substrateCost: ({ substrateCost }) => {
		if (!validPositiveNumber(substrateCost)) {
			return "Substrate cost must be a positive number";
		}
	},
};

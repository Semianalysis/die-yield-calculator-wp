import { InputValues } from "./calculations";
import { minDieEdge } from "../config";

const validPositiveInteger = (value: number) => !isNaN(value) && value >= 0;

// Validation function returns a message if the input is invalid, or null if it's valid
type Validator = (
	inputs: InputValues,
	fieldSize: {
		fieldWidth: number;
		fieldHeight: number;
	},
) => string | undefined;

/**
 * Validate the die width and horizontal scribe line width
 * @param dieWidth
 * @param scribeHoriz
 * @param fieldWidth
 */
const dieWidthAndHorizontalScribe: Validator = (
	{ dieWidth, scribeHoriz },
	{ fieldWidth },
) => {
	if (!validPositiveInteger(dieWidth)) {
		return "Invalid die width";
	}

	if (!validPositiveInteger(scribeHoriz)) {
		return "Invalid horizontal scribe line width";
	}

	if (dieWidth < minDieEdge) {
		return `Die must be at least ${minDieEdge}mm wide`;
	}

	if (dieWidth + scribeHoriz > fieldWidth) {
		return `Die and scribe line width must be less than or equal to the field width (${fieldWidth}mm).`;
	}
};

/**
 * Validate the die height and vertical scribe line width
 * @param dieHeight
 * @param scribeVert
 * @param fieldHeight
 */
const dieHeightAndVerticalScribe: Validator = (
	{ dieHeight, scribeVert },
	{ fieldHeight },
) => {
	if (!validPositiveInteger(dieHeight)) {
		return "Invalid die height";
	}

	if (!validPositiveInteger(scribeVert)) {
		return "Invalid vertical scribe line width";
	}

	if (dieHeight < minDieEdge) {
		return `Die must be at least ${minDieEdge}mm tall`;
	}

	if (dieHeight + scribeVert > fieldHeight) {
		return `Die and scribe line height must be less than or equal to the field height (${fieldHeight}mm).`;
	}
};

export const validations: { [k in keyof InputValues]: Validator } = {
	dieWidth: dieWidthAndHorizontalScribe,
	dieHeight: dieHeightAndVerticalScribe,
	criticalArea: ({ criticalArea, dieHeight, dieWidth }) => {
		if (!validPositiveInteger(criticalArea)) {
			return "Invalid critical area";
		}

		if (criticalArea > dieWidth * dieHeight) {
			return "Critical area must be less than or equal to die area";
		}
	},
	defectRate: ({ defectRate }) => {
		if (!validPositiveInteger(defectRate)) {
			return "Invalid defect rate";
		}
	},
	lossyEdgeWidth: ({ lossyEdgeWidth }) => {
		if (!validPositiveInteger(lossyEdgeWidth)) {
			return "Invalid lossy edge width";
		}
	},
	notchKeepOutHeight: ({ notchKeepOutHeight }) => {
		if (!validPositiveInteger(notchKeepOutHeight)) {
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
	criticalLayers: ({ criticalLayers }) => {
		if (!validPositiveInteger(criticalLayers) || criticalLayers > 100) {
			return "Invalid critical layer count";
		}
	},
};

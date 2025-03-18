// validations.spec.ts
import { validations } from "./validations";
import { InputValues } from "./calculations";
import { minDieEdge } from "../config";

describe("validations", () => {
	const fieldSize = { fieldWidth: 26, fieldHeight: 33 };

	describe("dieWidthAndHorizontalScribe (validations.dieWidth / validations.scribeHoriz)", () => {
		it("returns 'Invalid die width' if dieWidth is NaN", () => {
			const inputs: InputValues = {
				dieWidth: NaN,
				scribeHoriz: 10,
			} as any; // Casting so we don't need every property
			const result = validations.dieWidth(inputs, fieldSize);
			expect(result).toBe("Invalid die width");
		});

		it("returns 'Invalid horizontal scribe line width' if scribeHoriz is NaN", () => {
			const inputs: InputValues = {
				dieWidth: 10,
				scribeHoriz: NaN,
			} as any;
			const result = validations.dieWidth(inputs, fieldSize);
			expect(result).toBe("Invalid horizontal scribe line width");
		});

		it(`returns 'Die must be at least ${minDieEdge}mm wide' if dieWidth < minDieEdge`, () => {
			const inputs: InputValues = {
				dieWidth: minDieEdge - 0.01,
				scribeHoriz: 1,
			} as any;
			const result = validations.dieWidth(inputs, fieldSize);
			expect(result).toBe(`Die must be at least ${minDieEdge}mm wide`);
		});

		it("returns error if dieWidth + scribeHoriz > fieldWidth", () => {
			const inputs: InputValues = {
				dieWidth: 26,
				scribeHoriz: 0.1,
			} as any;
			const result = validations.dieWidth(inputs, fieldSize);
			expect(result).toBe(
				`Die and scribe line width must be less than or equal to the field width (${fieldSize.fieldWidth}mm).`,
			);
		});

		it("returns undefined if dieWidth and scribeHoriz are valid", () => {
			const inputs: InputValues = {
				dieWidth: minDieEdge,
				scribeHoriz: 1,
			} as any;
			const result = validations.dieWidth(inputs, fieldSize);
			expect(result).toBeUndefined();
		});

		it("returns 'Invalid die width' if dieWidth is NaN when calling validations.scribeHoriz", () => {
			const inputs: InputValues = {
				dieWidth: NaN,
				scribeHoriz: 1,
			} as any;
			const result = validations.scribeHoriz(inputs, fieldSize);
			expect(result).toBe("Invalid die width");
		});
	});

	describe("dieHeightAndVerticalScribe (validations.dieHeight / validations.scribeVert)", () => {
		it("returns 'Invalid die height' if dieHeight is NaN", () => {
			const inputs: InputValues = {
				dieHeight: NaN,
				scribeVert: 1,
			} as any;
			const result = validations.dieHeight(inputs, fieldSize);
			expect(result).toBe("Invalid die height");
		});

		it("returns 'Invalid vertical scribe line width' if scribeVert is NaN", () => {
			const inputs: InputValues = {
				dieHeight: 10,
				scribeVert: NaN,
			} as any;
			const result = validations.dieHeight(inputs, fieldSize);
			expect(result).toBe("Invalid vertical scribe line width");
		});

		it(`returns 'Die must be at least ${minDieEdge}mm tall' if dieHeight < minDieEdge`, () => {
			const inputs: InputValues = {
				dieHeight: minDieEdge - 0.01,
				scribeVert: 1,
			} as any;
			const result = validations.dieHeight(inputs, fieldSize);
			expect(result).toBe(`Die must be at least ${minDieEdge}mm tall`);
		});

		it("returns error if dieHeight + scribeVert > fieldHeight", () => {
			const inputs: InputValues = {
				dieHeight: 33,
				scribeVert: 0.1,
			} as any;
			const result = validations.dieHeight(inputs, fieldSize);
			expect(result).toBe(
				`Die and scribe line height must be less than or equal to the field height (${fieldSize.fieldHeight}mm).`,
			);
		});

		it("returns undefined if dieHeight and scribeVert are valid", () => {
			const inputs: InputValues = {
				dieHeight: minDieEdge,
				scribeVert: 1,
			} as any;
			const result = validations.dieHeight(inputs, fieldSize);
			expect(result).toBeUndefined();
		});

		it("returns 'Invalid die height' if dieHeight is NaN when calling validations.scribeVert", () => {
			const inputs: InputValues = {
				dieHeight: NaN,
				scribeVert: 1,
			} as any;
			const result = validations.scribeVert(inputs, fieldSize);
			expect(result).toBe("Invalid die height");
		});
	});

	describe("criticalArea", () => {
		it("returns 'Invalid critical area' if criticalArea is NaN or negative", () => {
			const inputs: InputValues = {
				criticalArea: -1,
				dieWidth: 10,
				dieHeight: 10,
			} as any;
			const result = validations.criticalArea(inputs, fieldSize);
			expect(result).toBe("Invalid critical area");
		});

		it("returns 'Critical area must be less than or equal to die area' if critical area > die area", () => {
			const inputs: InputValues = {
				criticalArea: 101,
				dieWidth: 10,
				dieHeight: 10,
			} as any;
			const result = validations.criticalArea(inputs, fieldSize);
			expect(result).toBe(
				"Critical area must be less than or equal to die area",
			);
		});

		it("returns undefined for a valid criticalArea", () => {
			const inputs: InputValues = {
				criticalArea: 50,
				dieWidth: 10,
				dieHeight: 10,
			} as any;
			const result = validations.criticalArea(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("defectRate", () => {
		it("returns 'Invalid defect rate' if defectRate is NaN or negative", () => {
			const inputs: InputValues = {
				defectRate: -1,
			} as any;
			const result = validations.defectRate(inputs, fieldSize);
			expect(result).toBe("Invalid defect rate");
		});

		it("returns undefined if defectRate is valid", () => {
			const inputs: InputValues = {
				defectRate: 10,
			} as any;
			const result = validations.defectRate(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("lossyEdgeWidth", () => {
		it("returns 'Invalid lossy edge width' if lossyEdgeWidth is NaN or negative", () => {
			const inputs: InputValues = {
				lossyEdgeWidth: -5,
			} as any;
			const result = validations.lossyEdgeWidth(inputs, fieldSize);
			expect(result).toBe("Invalid lossy edge width");
		});

		it("returns undefined if lossyEdgeWidth is valid", () => {
			const inputs: InputValues = {
				lossyEdgeWidth: 0,
			} as any;
			const result = validations.lossyEdgeWidth(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("notchKeepOutHeight", () => {
		it("returns 'Invalid notch keep-out height' if notchKeepOutHeight is NaN or negative", () => {
			const inputs: InputValues = {
				notchKeepOutHeight: -2,
			} as any;
			const result = validations.notchKeepOutHeight(inputs, fieldSize);
			expect(result).toBe("Invalid notch keep-out height");
		});

		it("returns undefined if notchKeepOutHeight is valid", () => {
			const inputs: InputValues = {
				notchKeepOutHeight: 10,
			} as any;
			const result = validations.notchKeepOutHeight(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("transHoriz", () => {
		it("returns 'Invalid horizontal translation' if transHoriz is NaN", () => {
			const inputs: InputValues = {
				transHoriz: NaN,
			} as any;
			const result = validations.transHoriz(inputs, fieldSize);
			expect(result).toBe("Invalid horizontal translation");
		});

		it("returns undefined if transHoriz is a valid number", () => {
			const inputs: InputValues = {
				transHoriz: 5,
			} as any;
			const result = validations.transHoriz(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("transVert", () => {
		it("returns 'Invalid vertical translation' if transVert is NaN", () => {
			const inputs: InputValues = {
				transVert: NaN,
			} as any;
			const result = validations.transVert(inputs, fieldSize);
			expect(result).toBe("Invalid vertical translation");
		});

		it("returns undefined if transVert is a valid number", () => {
			const inputs: InputValues = {
				transVert: 5,
			} as any;
			const result = validations.transVert(inputs, fieldSize);
			expect(result).toBeUndefined();
		});
	});

	describe("criticalLayers", () => {
		it("returns 'Invalid critical layer count' if criticalLayers is negative or NaN and <= 100", () => {
			const inputs: InputValues = {
				criticalLayers: -1,
			} as any;
			const result = validations.criticalLayers(inputs, fieldSize);
			expect(result).toBe("Invalid critical layer count");
		});

		it("returns undefined if criticalLayers is a valid non-negative integer and <= 100", () => {
			const inputs: InputValues = {
				criticalLayers: 50,
			} as any;
			const result = validations.criticalLayers(inputs, fieldSize);
			expect(result).toBeUndefined();
		});

		it("returns an error if criticalLayers > 100", () => {
			const inputs: InputValues = {
				criticalLayers: 101,
			} as any;
			const result = validations.criticalLayers(inputs, fieldSize);
			expect(result).toBe("Invalid critical layer count");
		});
	});
});

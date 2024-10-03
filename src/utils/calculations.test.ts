import { getFabYield, isInsideCircle, rectanglesInCircle, isInsideRectangle } from "./calculations";
import { yieldModels } from "../config";

describe("Calculations", () => {
	describe("isInsideCircle", () => {
		it("returns false for coordinates in the corner", () => {
			expect(isInsideCircle(0, 0, 60, 60, 60)).toBe(false);
			expect(isInsideCircle(0, 120, 60, 60, 60)).toBe(false);
			expect(isInsideCircle(120, 0, 60, 60, 60)).toBe(false);
			expect(isInsideCircle(120, 120, 60, 60, 60)).toBe(false);
		});

		it("returns true for coordinates in the center", () => {
			expect(isInsideCircle(30, 30, 60, 60, 60)).toBe(true);
			expect(isInsideCircle(90, 30, 60, 60, 60)).toBe(true);
			expect(isInsideCircle(30, 90, 60, 60, 60)).toBe(true);
			expect(isInsideCircle(90, 90, 60, 60, 60)).toBe(true);
		});
	});

	describe("isInsideRectangle", () => {
		it("returns false for coordinates in the corner", () => {
			expect(isInsideRectangle(0, 0, 5, 5, 60, 60)).toBe(false);
			expect(isInsideRectangle(0, 70, 5, 5, 60, 60)).toBe(false);
			expect(isInsideRectangle(70, 0, 5, 5, 60, 60)).toBe(false);
			expect(isInsideRectangle(70, 70, 5, 5, 60, 60)).toBe(false);
		});

		it("returns true for coordinates in the center", () => {
			expect(isInsideRectangle(20, 20, 5, 5, 60, 60)).toBe(true);
			expect(isInsideRectangle(40, 20, 5, 5, 60, 60)).toBe(true);
			expect(isInsideRectangle(60, 40, 5, 5, 60, 60)).toBe(true);
			expect(isInsideRectangle(60, 60, 5, 5, 60, 60)).toBe(true);
		});
	})

	describe("rectanglesInCircle", () => {
		it("calculates the correct number of possible rectangles in a circle", () => {
			expect(rectanglesInCircle(100, 10, 10, 0, 0, 0, 0).length).toBe(60);
			expect(rectanglesInCircle(100, 1, 1, 0, 0, 0, 0).length).toBe(7644);
		});
	});

	describe("getFabYield", () => {
		it.each(Object.keys(yieldModels))("calculates a yield within the expected range for the %s model", (model) => {
			expect(getFabYield(0.01, 1000, model as keyof typeof yieldModels)).toBeGreaterThan(0.90);
			expect(getFabYield(0.01, 1000, model as keyof typeof yieldModels)).toBeLessThan(0.91);
		});
		it.each(Object.keys(yieldModels))("returns a full yield if the defect rate is 0 for the %s model", (model) => {
			expect(getFabYield(0, 1000, model as keyof typeof yieldModels)).toEqual(1);
		});
	});
});

import { getFabYield, isInsideCircle, rectanglesInCircle } from "./calculations";
import { YIELDMODELS } from "../components/App";

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

	describe("rectanglesInCircle", () => {
		it("calculates the correct number of possible rectangles in a circle", () => {
			expect(rectanglesInCircle(100, 10, 10).length).toBe(60);
			expect(rectanglesInCircle(100, 1, 1).length).toBe(7644);
		});
	});

	describe("getFabYield", () => {
		it.each(Object.keys(YIELDMODELS))("calculates a yield within the expected range for the %s model", (model) => {
			expect(getFabYield(0.01, 1000, model as keyof typeof YIELDMODELS)).toBeGreaterThan(0.90);
			expect(getFabYield(0.01, 1000, model as keyof typeof YIELDMODELS)).toBeLessThan(0.91);
		});
	});
});

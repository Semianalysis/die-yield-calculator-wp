import {
	getRectCorners,
	isInsideCircle,
	isInsideRectangle,
	rectanglesInCircle,
	rectanglesInRectangle
} from "./geometry";

describe("geometry utils", () => {
	describe("getRectCorners", () => {
		it("should calculate the corners of a rectangle with positive width and height", () => {
			const x = 0;
			const y = 0;
			const width = 10;
			const height = 5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 0, y: 0 },    // top-left
				{ x: 10, y: 0 },   // top-right
				{ x: 0, y: 5 },    // bottom-left
				{ x: 10, y: 5 }   // bottom-right
			]);
		});

		it("should handle rectangles with negative coordinates", () => {
			const x = -5;
			const y = -5;
			const width = 10;
			const height = 5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: -5, y: -5 },  // top-left
				{ x: 5, y: -5 },   // top-right
				{ x: -5, y: 0 },   // bottom-left
				{ x: 5, y: 0 }    // bottom-right
			]);
		});

		it("should handle rectangles with zero width and height", () => {
			const x = 10;
			const y = 20;
			const width = 0;
			const height = 0;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 10, y: 20 },  // top-left (all points the same)
				{ x: 10, y: 20 },  // top-right
				{ x: 10, y: 20 },  // bottom-left
				{ x: 10, y: 20 }  // bottom-right
			]);
		});

		it("should handle rectangles with negative width and height", () => {
			const x = 10;
			const y = 20;
			const width = -10;
			const height = -5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 10, y: 20 },   // top-left
				{ x: 0, y: 20 },    // top-right (since width is negative, right moves left)
				{ x: 10, y: 15 },   // bottom-left (since height is negative, bottom moves up)
				{ x: 0, y: 15 }    // bottom-right
			]);
		});

		it("should handle rectangles with floating-point numbers", () => {
			const x = 1.5;
			const y = 2.5;
			const width = 3.2;
			const height = 4.8;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 1.5, y: 2.5 },     // top-left
				{ x: 4.7, y: 2.5 },     // top-right
				{ x: 1.5, y: 7.3 },     // bottom-left
				{ x: 4.7, y: 7.3 }     // bottom-right
			]);
		});
	});
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
	});

	describe("rectanglesInCircle", () => {
		it("calculates the correct number of possible rectangles in a circle", () => {
			expect(rectanglesInCircle(100, 10, 10, 0, 0, 0, 0).length).toBe(60);
			expect(rectanglesInCircle(100, 1, 1, 0, 0, 0, 0).length).toBe(7644);
		});
	});

	describe("rectanglesInRectangle", () => {
		it("calculates the correct number of possible rectangles in another rectangle", () => {
			expect(rectanglesInRectangle(100, 100, 10, 10, 0, 0, 0, 0).length).toBe(100);
			expect(rectanglesInRectangle(100, 100, 10, 10, 10, 10, 0, 0).length).toBe(25);
		});
	});
});

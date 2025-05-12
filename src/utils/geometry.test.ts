import {
	getRectCenter,
	getRectCorners,
	isInsideCircle,
	isInsideRectangle,
	rectanglesInCircle,
	rectanglesInRectangle
} from "./geometry";

describe("geometry utils", () => {
	describe("getRectCenter", () => {
		it("should calculate the center of a rectangle with positive width and height", () => {
			const x = 0;
			const y = 0;
			const width = 10;
			const height = 5;

			const result = getRectCenter(x, y, width, height);

			expect(result).toEqual({ x: 5, y: 2.5 });
		});

		it("should handle rectangles with negative coordinates", () => {
			const x = -5;
			const y = -5;
			const width = 10;
			const height = 5;

			const result = getRectCenter(x, y, width, height);

			expect(result).toEqual({ x: 0, y: -2.5 });
		});

		it("should handle rectangles with zero width and height", () => {
			const x = 10;
			const y = 20;
			const width = 0;
			const height = 0;

			const result = getRectCenter(x, y, width, height);

			expect(result).toEqual({ x: 10, y: 20 });
		});
	})
	describe("getRectCorners", () => {
		it("should calculate the corners of a rectangle with positive width and height", () => {
			const x = 0;
			const y = 0;
			const width = 10;
			const height = 5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 0, y: 0 }, // top-left
				{ x: 10, y: 0 }, // top-right
				{ x: 0, y: 5 }, // bottom-left
				{ x: 10, y: 5 } // bottom-right
			]);
		});

		it("should handle rectangles with negative coordinates", () => {
			const x = -5;
			const y = -5;
			const width = 10;
			const height = 5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: -5, y: -5 }, // top-left
				{ x: 5, y: -5 }, // top-right
				{ x: -5, y: 0 }, // bottom-left
				{ x: 5, y: 0 } // bottom-right
			]);
		});

		it("should handle rectangles with zero width and height", () => {
			const x = 10;
			const y = 20;
			const width = 0;
			const height = 0;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 10, y: 20 }, // top-left (all points the same)
				{ x: 10, y: 20 }, // top-right
				{ x: 10, y: 20 }, // bottom-left
				{ x: 10, y: 20 } // bottom-right
			]);
		});

		it("should handle rectangles with negative width and height", () => {
			const x = 10;
			const y = 20;
			const width = -10;
			const height = -5;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 10, y: 20 }, // top-left
				{ x: 0, y: 20 }, // top-right (since width is negative, right moves left)
				{ x: 10, y: 15 }, // bottom-left (since height is negative, bottom moves up)
				{ x: 0, y: 15 } // bottom-right
			]);
		});

		it("should handle rectangles with floating-point numbers", () => {
			const x = 1.5;
			const y = 2.5;
			const width = 3.2;
			const height = 4.8;

			const result = getRectCorners(x, y, width, height);

			expect(result).toEqual([
				{ x: 1.5, y: 2.5 }, // top-left
				{ x: 4.7, y: 2.5 }, // top-right
				{ x: 1.5, y: 7.3 }, // bottom-left
				{ x: 4.7, y: 7.3 } // bottom-right
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
			expect(rectanglesInCircle(100, 10, 10, 0, 0, 0, 0, false).length).toBe(
				60
			);
			expect(rectanglesInCircle(100, 1, 1, 0, 0, 0, 0, false).length).toBe(
				7644
			);
		});

		it("calculates partial overlaps", () => {
			// We count many more rectangles if we allow them to overlap the edge of the circle
			expect(rectanglesInCircle(100, 10, 10, 0, 0, 0, 0, true).length).toBe(
				104
			);
		});
	});

	describe("rectanglesInRectangle", () => {
		it("calculates the correct number of possible rectangles in another rectangle when starting from the top-left", () => {
			expect(
				rectanglesInRectangle(100, 100, 10, 10, 0, 0, 0, 0, false, false)
					.positions.length
			).toBe(100);
			expect(
				rectanglesInRectangle(100, 100, 10, 10, 10, 10, 0, 0, false, false)
					.positions.length
			).toBe(25);
			expect(
				rectanglesInRectangle(60, 60, 20, 20, 0, 0, 0, 0, false, false).positions.length
			).toBe(9);
		});

		it("calculates the correct number of rectangles when starting from the center", () => {
			expect(
				rectanglesInRectangle(60, 60, 20, 20, 0, 0, 0, 0, true, false).positions.length
			).toBe(9);
			expect(
				rectanglesInRectangle(60, 60, 30, 30, 0, 0, 0, 0, true, false).positions.length
			).toBe(4);
			// When the inner square is more than 1/2 the width or height of the outer square, it centers it correctly
			expect(
				rectanglesInRectangle(60, 60, 40, 40, 0, 0, 0, 0, true, false).positions.length
			).toBe(1);
		});

		it("calculates partial overlaps when starting from the top left", () => {
			// Inner squares are 40% the size of the outer square, but we can fit 9 squares
			// because of partial overlaps
			expect(
				rectanglesInRectangle(100, 100, 40, 40, 0, 0, 0, 0, false, true).positions.length
			).toBe(9);
			// Once the inner square areas divide evenly into the outer square area, the
			// partial overlaps are edged out
			expect(
				rectanglesInRectangle(100, 100, 50, 50, 0, 0, 0, 0, false, true).positions.length
			).toBe(4);
		});

		it("calculates partial overlaps when starting from the center", () => {
			// Inner squares are 90% the area of the outer square, but we can fit 9 squares
			// because we allow partial overlaps
			expect(
				rectanglesInRectangle(100, 100, 90, 90, 0, 0, 0, 0, true, true).positions.length
			).toBe(9);

			// Inner square is slightly less than 1/3 the size of the outer square, and we
			// can fit 16 squares because we allow the outer squares to overlap
			expect(
				rectanglesInRectangle(70, 70, 20, 20, 0, 0, 0, 0, true, true).positions.length
			).toBe(25);
		});

		it('calculates the correct number of rows and columns', () => {
			const result = rectanglesInRectangle(90, 100, 10, 10, 0, 0, 0, 0, false, false);
			expect(result.numRows).toBe(10);
			expect(result.numCols).toBe(9);
			expect(result.numRows * result.numCols).toBe(result.positions.length);
		})
	});
});

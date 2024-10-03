import {
	getDieStateCounts,
	getFabYield
} from "./calculations";
import { yieldModels } from "../config";
import { DieState } from "../types";

describe("Calculations", () => {
	describe("getDieStateCounts", () => {
		it("counts only \"good\" dies", () => {
			expect(getDieStateCounts(["good", "good", "good"])).toEqual({
				goodDies: 3, defectiveDies: 0, partialDies: 0, lostDies: 0
			});
		});

		it("counts only \"defective\" dies", () => {
			expect(getDieStateCounts(["defective", "defective"])).toEqual({
				goodDies: 0, defectiveDies: 2, partialDies: 0, lostDies: 0
			});
		});

		it("counts mixed die states", () => {
			expect(getDieStateCounts(["good", "defective", "partial", "lost", "good"])).toEqual({
				goodDies: 2, defectiveDies: 1, partialDies: 1, lostDies: 1
			});
		});

		it("returns all zeros for empty input", () => {
			expect(getDieStateCounts([])).toEqual({
				goodDies: 0, defectiveDies: 0, partialDies: 0, lostDies: 0
			});
		});

		it("counts no \"good\" dies", () => {
			expect(getDieStateCounts(["defective", "partial", "lost"])).toEqual({
				goodDies: 0, defectiveDies: 1, partialDies: 1, lostDies: 1
			});
		});

		it("asserts total die count matches input length", () => {
			const dieStates: Array<DieState> = ["good", "defective", "partial", "lost", "good"];
			const counts = getDieStateCounts(dieStates);
			const totalCount = counts.goodDies + counts.defectiveDies + counts.partialDies + counts.lostDies;
			expect(totalCount).toBe(dieStates.length);
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

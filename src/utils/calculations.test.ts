import {
	createDieMap,
	evaluateDiscInputs,
	getDieStateCounts,
	getFabYield,
	randomNumberSetFromRange,
} from "./calculations";
import { yieldModels } from "../config";
import { DieState } from "../types";
import {
	isInsideCircle,
	rectanglesInCircle,
	rectanglesInRectangle,
} from "./geometry";

describe("Calculations", () => {
	describe("getDieStateCounts", () => {
		it('counts only "good" dies', () => {
			expect(getDieStateCounts(["good", "good", "good"])).toEqual({
				goodDies: 3,
				defectiveDies: 0,
				partialDies: 0,
				lostDies: 0,
			});
		});

		it('counts only "defective" dies', () => {
			expect(getDieStateCounts(["defective", "defective"])).toEqual({
				goodDies: 0,
				defectiveDies: 2,
				partialDies: 0,
				lostDies: 0,
			});
		});

		it("counts mixed die states", () => {
			expect(
				getDieStateCounts(["good", "defective", "partial", "lost", "good"]),
			).toEqual({
				goodDies: 2,
				defectiveDies: 1,
				partialDies: 1,
				lostDies: 1,
			});
		});

		it("returns all zeros for empty input", () => {
			expect(getDieStateCounts([])).toEqual({
				goodDies: 0,
				defectiveDies: 0,
				partialDies: 0,
				lostDies: 0,
			});
		});

		it('counts no "good" dies', () => {
			expect(getDieStateCounts(["defective", "partial", "lost"])).toEqual({
				goodDies: 0,
				defectiveDies: 1,
				partialDies: 1,
				lostDies: 1,
			});
		});

		it("asserts total die count matches input length", () => {
			const dieStates: Array<DieState> = [
				"good",
				"defective",
				"partial",
				"lost",
				"good",
			];
			const counts = getDieStateCounts(dieStates);
			const totalCount =
				counts.goodDies +
				counts.defectiveDies +
				counts.partialDies +
				counts.lostDies;
			expect(totalCount).toBe(dieStates.length);
		});
	});

	describe("getFabYield", () => {
		it.each(["poisson", "murphy", "rect", "seeds", "bose-einstein"])(
			"calculates a yield within the expected range for the %s model",
			(model) => {
				expect(
					getFabYield(0.01, 1000, model as keyof typeof yieldModels, 1),
				).toBeCloseTo(0.9, 1);
			},
		);
		it.each(Object.keys(yieldModels))(
			"returns a full yield if the defect rate is 0 for the %s model",
			(model) => {
				expect(getFabYield(0, 1000, model as keyof typeof yieldModels, 1)).toEqual(
					1,
				);
			},
		);
	});

	describe("randomNumberSetFromRange", () => {
		it("generates a set of random numbers within a range", () => {
			const set = randomNumberSetFromRange(1, 10, 5);
			expect(set.size).toBe(5);
			set.forEach((num) => {
				expect(num).toBeGreaterThanOrEqual(1);
				expect(num).toBeLessThanOrEqual(10);
			});
		});
	});

	describe("createDieMap", () => {
		it("only applies yield to good dies", () => {
			const dieEdge = 12;
			const waferDiameter = 300;
			const fabYield = 0.75;
			const diesInShot = rectanglesInRectangle(
				26,
				33,
				dieEdge,
				dieEdge,
				0.2,
				0.2,
				0,
				0,
				true,
				false,
			);
			const shotPositions = rectanglesInCircle(
				waferDiameter,
				26,
				33,
				0,
				0,
				0,
				0,
				true,
			);

			const dieMap = createDieMap(
				shotPositions,
				diesInShot.positions,
				dieEdge,
				dieEdge,
				fabYield,
				(coordinate) => {
					const lossyEdgeWidth = 3;
					const radiusInsideLossyEdge = waferDiameter / 2 - lossyEdgeWidth;
					return isInsideCircle(
						coordinate.x,
						coordinate.y,
						waferDiameter / 2,
						waferDiameter / 2,
						radiusInsideLossyEdge,
					);
				},
			);

			const diesFullyOnWafer = dieMap.dies.filter(
				(die) => die.dieState !== "lost" && die.dieState !== "partial",
			);
			const defectiveDies = dieMap.dies.filter(
				(die) => die.dieState === "defective",
			);
			// Yield should only have been applied to dies that are not lost or partial
			expect(
				(
					(diesFullyOnWafer.length - defectiveDies.length) /
					diesFullyOnWafer.length
				).toFixed(2),
			).toEqual(fabYield.toString());
		});

		it("calculates the shots to be taken and counts how many are full vs. partial", () => {
			const dieEdge = 12;
			const waferDiameter = 300;
			const fabYield = 0.75;
			const diesInShot = rectanglesInRectangle(
				26,
				33,
				dieEdge,
				dieEdge,
				0.2,
				0.2,
				0,
				0,
				true,
				false,
			);
			const shotPositions = rectanglesInCircle(
				waferDiameter,
				26,
				33,
				0,
				0,
				0,
				0,
				true,
			);

			const { fullShotCount, partialShotCount, shotsOnWafer } = createDieMap(
				shotPositions,
				diesInShot.positions,
				dieEdge,
				dieEdge,
				fabYield,
				(coordinate) => {
					const lossyEdgeWidth = 3;
					const radiusInsideLossyEdge = waferDiameter / 2 - lossyEdgeWidth;
					return isInsideCircle(
						coordinate.x,
						coordinate.y,
						waferDiameter / 2,
						waferDiameter / 2,
						radiusInsideLossyEdge,
					);
				},
			);

			expect(fullShotCount + partialShotCount).toEqual(shotsOnWafer.length);
		});

		it('shows the correct total number of die based on the number of exposures and the number of dies in a shot', () => {
			const dieEdge = 12;
			const waferDiameter = 300;
			const fabYield = 0.75;
			const diesInShot = rectanglesInRectangle(
				26,
				33,
				dieEdge,
				dieEdge,
				0.2,
				0.2,
				0,
				0,
				true,
				false,
			);
			const shotPositions = rectanglesInCircle(
				waferDiameter,
				26,
				33,
				0,
				0,
				0,
				0,
				true,
			);

			const { shotsOnWafer, dies } = createDieMap(
				shotPositions,
				diesInShot.positions,
				dieEdge,
				dieEdge,
				fabYield,
				(coordinate) => {
					const lossyEdgeWidth = 3;
					const radiusInsideLossyEdge = waferDiameter / 2 - lossyEdgeWidth;
					return isInsideCircle(
						coordinate.x,
						coordinate.y,
						waferDiameter / 2,
						waferDiameter / 2,
						radiusInsideLossyEdge,
					);
				},
			);

			const excludedDies = dies.filter(die => die.dieState === "lost");
			const goodDies = dies.filter(die => die.dieState === "good");
			const defectiveDies = dies.filter(die => die.dieState === "defective");
			const partialDies = dies.filter(die => die.dieState === "partial");
			expect(excludedDies.length + goodDies.length + defectiveDies.length + partialDies.length).toEqual(shotsOnWafer.length * diesInShot.numCols * diesInShot.numRows);
		});
	});

	describe("evaluateDiscInputs", () => {
		it("calculates how much of the reticle area is made of up dies", () => {
			const inputVals = {
				dieWidth: 8,
				dieHeight: 8,
				criticalArea: 64,
				defectRate: 0.1,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				scribeHoriz: 0.2,
				scribeVert: 0.2,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 50,
			};
			const result = evaluateDiscInputs(inputVals, "s300mm", "murphy", 26, 33);
			expect(result?.reticleUtilization).toBeCloseTo(0.895105, 6);
		});
	});
});

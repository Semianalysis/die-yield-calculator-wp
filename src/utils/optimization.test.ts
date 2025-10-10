import { optimizeDieOffset } from "./optimization";
import { evaluateDiscInputs, InputValues } from "./calculations";

describe("optimizeDieOffset", () => {
	const baseOptions = {
		discSize: "s300mm" as const,
		fieldHeight: 33,
		fieldWidth: 26,
		panelSize: "s300mm" as const,
		reticleLimit: true,
		substrateShape: "Wafer" as const,
		yieldModel: "murphy" as const,
	};

	describe("optimization effectiveness", () => {
		it("produces equal or better results than non-optimized placement", () => {
			const inputValues: InputValues = {
				dieWidth: 9.2,
				dieHeight: 9.6,
				criticalArea: 88.32,
				defectRate: 0.1,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0.2,
				scribeVert: 0.2,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const nonOptimizedResult = evaluateDiscInputs(
				inputValues,
				baseOptions.discSize,
				baseOptions.yieldModel,
				baseOptions.fieldWidth,
				baseOptions.fieldHeight,
				baseOptions.reticleLimit,
			);

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(
				nonOptimizedResult?.goodDies || 0,
			);
		});

		it("finds optimal offsets for different die sizes", () => {
			const testCases = [
				{ dieWidth: 8, dieHeight: 8 },
				{ dieWidth: 10, dieHeight: 12 },
				{ dieWidth: 15, dieHeight: 15 },
			];

			testCases.forEach(({ dieWidth, dieHeight }) => {
				const inputValues: InputValues = {
					dieWidth,
					dieHeight,
					criticalArea: dieWidth * dieHeight,
					defectRate: 0.1,
					lossyEdgeWidth: 3,
					notchKeepOutHeight: 5,
					substrateCost: 20000,
					scribeHoriz: 0.2,
					scribeVert: 0.2,
					transHoriz: 0,
					transVert: 0,
					criticalLayers: 25,
					manualYield: 100,
				};

				const nonOptimizedResult = evaluateDiscInputs(
					inputValues,
					baseOptions.discSize,
					baseOptions.yieldModel,
					baseOptions.fieldWidth,
					baseOptions.fieldHeight,
					baseOptions.reticleLimit,
				);

				const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

				expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(
					nonOptimizedResult?.goodDies || 0,
				);
			});
		});

		it("handles different wafer sizes", () => {
			const waferSizes = ["s200mm", "s300mm", "s450mm"] as const;

			waferSizes.forEach((discSize) => {
				const inputValues: InputValues = {
					dieWidth: 10,
					dieHeight: 10,
					criticalArea: 100,
					defectRate: 0.1,
					lossyEdgeWidth: 3,
					notchKeepOutHeight: 5,
					substrateCost: 20000,
					scribeHoriz: 0.2,
					scribeVert: 0.2,
					transHoriz: 0,
					transVert: 0,
					criticalLayers: 25,
					manualYield: 100,
				};

				const options = { ...baseOptions, discSize };

				const nonOptimizedResult = evaluateDiscInputs(
					inputValues,
					discSize,
					options.yieldModel,
					options.fieldWidth,
					options.fieldHeight,
					options.reticleLimit,
				);

				const optimizationResult = optimizeDieOffset(inputValues, options);

				expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(
					nonOptimizedResult?.goodDies || 0,
				);
			});
		});
	});

	describe("optimization characteristics", () => {
		it("returns a positive number of good dies", () => {
			const inputValues: InputValues = {
				dieWidth: 9.2,
				dieHeight: 9.6,
				criticalArea: 88.32,
				defectRate: 0.1,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0.2,
				scribeVert: 0.2,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const result = optimizeDieOffset(inputValues, baseOptions);

			expect(result.maxGoodDies).toBeGreaterThan(0);
		});
	});

	describe("Silicon Edge DYC benchmark comparison", () => {
		// Silicon Edge benchmark DPW values fetched from:
		// https://www.silicon-edge.co.uk/j/index.php/resources/die-per-wafer
		// We should match or exceed these values.

		it("matches/beats Silicon Edge benchmark for 9.2x9.6mm die, 0.1mm scribe lines", () => {
			const siliconEdgeDPW = 697;

			const inputValues: InputValues = {
				dieWidth: 9.2,
				dieHeight: 9.6,
				criticalArea: 88.32,
				defectRate: 0,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0.1,
				scribeVert: 0.1,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});

		it("matches/beats Silicon Edge benchmark for 10x10mm die, 0.1mm scribes", () => {
			const siliconEdgeDPW = 612;

			const inputValues: InputValues = {
				dieWidth: 10,
				dieHeight: 10,
				criticalArea: 100,
				defectRate: 0,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0.1,
				scribeVert: 0.1,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});

		it("matches/beats Silicon Edge benchmark for 12x12mm die, no scribe line", () => {
			const siliconEdgeDPW = 432;

			const inputValues: InputValues = {
				dieWidth: 12,
				dieHeight: 12,
				criticalArea: 144,
				defectRate: 0,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0,
				scribeVert: 0,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});

		it("matches/beats Silicon Edge benchmark for 8x16mm die, no scribe line", () => {
			const siliconEdgeDPW = 481;

			const inputValues: InputValues = {
				dieWidth: 8,
				dieHeight: 16,
				criticalArea: 128,
				defectRate: 0,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0,
				scribeVert: 0,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});

		it("matches/beats Silicon Edge benchmark for 15x15mm die, 1mm scribe lines, 10mm notch, 5mm edge", () => {
			const siliconEdgeDPW = 229;

			const inputValues: InputValues = {
				dieWidth: 15,
				dieHeight: 15,
				criticalArea: 225,
				defectRate: 0,
				lossyEdgeWidth: 5,
				notchKeepOutHeight: 10,
				substrateCost: 20000,
				scribeHoriz: 1,
				scribeVert: 1,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});

		it("matches/beats Silicon Edge benchmark for 2x6mm die, 0.08mm scribe lines", () => {
			const siliconEdgeDPW = 5186;

			const inputValues: InputValues = {
				dieWidth: 2,
				dieHeight: 6,
				criticalArea: 225,
				defectRate: 0,
				lossyEdgeWidth: 3,
				notchKeepOutHeight: 5,
				substrateCost: 20000,
				scribeHoriz: 0.08,
				scribeVert: 0.08,
				transHoriz: 0,
				transVert: 0,
				criticalLayers: 25,
				manualYield: 100,
			};

			const optimizationResult = optimizeDieOffset(inputValues, baseOptions);

			expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
		});
	});


	it("matches/beats Silicon Edge benchmark for 67.7x60.5mm die, 0.08mm scribes, 5mm edge, 10mm notch", () => {
		const siliconEdgeDPW = 10;

		const inputValues: InputValues = {
			dieWidth: 67.7,
			dieHeight: 60.5,
			criticalArea: 4095.85,
			defectRate: 0,
			lossyEdgeWidth: 5,
			notchKeepOutHeight: 10,
			substrateCost: 20000,
			scribeHoriz: 0.08,
			scribeVert: 0.08,
			transHoriz: 0,
			transVert: 0,
			criticalLayers: 25,
			manualYield: 100,
		};

		const optimizationResult = optimizeDieOffset(inputValues, {
			...baseOptions,
			reticleLimit: false,
			fieldHeight: 300,
			fieldWidth: 300,
		});

		expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
	});

	it("matches/beats Silicon Edge benchmark for 200mm wafer, 45x45mm die, 0.08mm scribes, 5mm edge, 10mm notch", () => {
		const siliconEdgeDPW = 8;

		const inputValues: InputValues = {
			dieWidth: 45,
			dieHeight: 45,
			criticalArea: 2025,
			defectRate: 0,
			lossyEdgeWidth: 5,
			notchKeepOutHeight: 10,
			substrateCost: 20000,
			scribeHoriz: 0.08,
			scribeVert: 0.08,
			transHoriz: 0,
			transVert: 0,
			criticalLayers: 25,
			manualYield: 100,
		};

		const optimizationResult = optimizeDieOffset(inputValues, {
			...baseOptions,
			discSize: "s200mm",
			reticleLimit: false,
			fieldHeight: 200,
			fieldWidth: 200,
		});

		expect(optimizationResult.maxGoodDies).toBeGreaterThanOrEqual(siliconEdgeDPW);
	});
});

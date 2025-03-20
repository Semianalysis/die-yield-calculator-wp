import { yieldModels } from './yieldModels';

describe('yieldModels', () => {
	/**
	 * Standard yield models all have the signature yield(defects: number) => number
	 */
	const standardModelNames = ['poisson', 'murphy', 'rect', 'moore', 'seeds'] as const;

	describe.each(standardModelNames)('%s model', (modelName) => {
		const model = yieldModels[modelName];

		describe('returns a decimal between 0 and 1', () => {
			it.each([0, 0.1, 1, 5, 10])('defects = %f', (defects) => {
				const result = model.yield(defects);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(1);
			});
		});

		describe('higher defect rate yields a lower value', () => {
			it.each([
				[0.1, 0.2],
				[1, 2],
				[5, 10],
			])('defects %f vs %f', (lowDefects, highDefects) => {
				const yieldLow = model.yield(lowDefects);
				const yieldHigh = model.yield(highDefects);
				expect(yieldLow).toBeGreaterThan(yieldHigh);
			});
		});

		it('should handle defects = 0 gracefully (expected: 1)', () => {
			const result = model.yield(0);
			expect(result).toBeCloseTo(1, 5);
		});
	});

	describe('Bose-Einstein model', () => {
		const boseEinstein = yieldModels['bose-einstein'];

		describe('returns a decimal between 0 and 1', () => {
			it.each([
				[0, 1],
				[1, 1],
				[1, 10],
				[5, 5],
				[10, 2],
			])('defects = %f, criticalLayers = %f', (defects, criticalLayers) => {
				const result = boseEinstein.yield(defects, criticalLayers);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(1);
			});
		});

		describe('higher defect rate yields a lower value', () => {
			it.each([
				[0.1, 0.2, 1],
				[1, 2, 2],
				[5, 6, 10],
			])(
				'defects %f vs %f with criticalLayers = %f',
				(lowDefects, highDefects, criticalLayers) => {
					const yieldLow = boseEinstein.yield(lowDefects, criticalLayers);
					const yieldHigh = boseEinstein.yield(highDefects, criticalLayers);
					expect(yieldLow).toBeGreaterThan(yieldHigh);
				},
			);
		});

		describe('more critical layers yields a lower value', () => {
			it.each([
				[1, 1, 2],
				[2, 1, 5],
				[10, 2, 4],
			])(
				'defects = %f, criticalLayers %f vs %f',
				(defects, fewerLayers, moreLayers) => {
					const yieldFewer = boseEinstein.yield(defects, fewerLayers);
					const yieldMore = boseEinstein.yield(defects, moreLayers);
					expect(yieldFewer).toBeGreaterThan(yieldMore);
				},
			);
		});
	});

	describe('Manual model', () => {
		const { manual } = yieldModels;

		describe('always converts percentage to decimal correctly', () => {
			it.each([
				[0, 0],
				[50, 0.5],
				[100, 1],
				[25, 0.25],
				[99, 0.99],
			])('manualYield = %i%% => %f', (input, expected) => {
				const result = manual.yield(input);
				expect(result).toBeCloseTo(expected, 5);
			});
		});

		describe('result is between 0 and 1 for valid percentages', () => {
			it.each([0, 10, 50, 99, 100])('manualYield = %f', (value) => {
				const result = manual.yield(value);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(1);
			});
		});
	});

	/**
	 * Example of an additional numeric correctness check
	 * (You may decide if you want this; it's just an example of
	 * verifying known edge-case calculations.)
	 */
	describe('Numeric correctness on edge cases', () => {
		it('Poisson model at defects = 2 -> e^-2', () => {
			const expected = Math.exp(-2);
			const result = yieldModels.poisson.yield(2);
			expect(result).toBeCloseTo(expected, 6);
		});

		it('Moore model at defects = 4 -> e^-sqrt(4) = e^-2', () => {
			const expected = Math.exp(-2);
			const result = yieldModels.moore.yield(4);
			expect(result).toBeCloseTo(expected, 6);
		});
	});
});

import {clampedInputDisplayValue} from './inputs';

describe('clampedInputDisplayValue', () => {
	it('returns the value if it is within the range', () => {
		expect(clampedInputDisplayValue('2', 1, 3)).toBe('2');
	});

	it ('returns the min value if the input is less than the min', () => {
		expect(clampedInputDisplayValue('0', 1, 3)).toBe('1');
	});

	it('returns the max value if the input is greater than the max', () => {
		expect(clampedInputDisplayValue('4', 1, 3)).toBe('3');
	});

	it('replaces trailing ".0" if there was one', () => {
		expect(clampedInputDisplayValue('2.0', 1, 3)).toBe('2.0');
		expect(clampedInputDisplayValue('1.00000', 1, 3)).toBe('1.00000');
		expect(clampedInputDisplayValue('13.0004', 13, 13.1)).toBe('13.0004');
		expect(clampedInputDisplayValue('2.040', 2, 3)).toBe('2.040');
	});
});

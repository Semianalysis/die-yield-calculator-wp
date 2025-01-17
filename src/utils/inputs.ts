/**
 * Clamps the input value to the range [min, max] and returns the clamped value.
 * @param value
 * @param min
 * @param max
 */
export function clampedInputDisplayValue(value: string, min: number, max: number) {
	const numValue = parseFloat(value);

	if (numValue < min) {
		return min.toString();
	}
	if (numValue > max) {
		return max.toString();
	}
	return value;
}

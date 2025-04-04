type Color = string;
let patterns: { [key: Color]: CanvasPattern } = {};

/**
 * Create a memoized hatch-effect canvas pattern on the given canvas context
 * that can be used as a fill.
 */
export function createHatchingCanvasPattern(
	context: CanvasRenderingContext2D,
	color: Color = "rgba(90,79,69,0.8)",
) {
	if (patterns[color]) {
		return patterns[color];
	}

	// Create an offscreen canvas to use as the pattern source
	const patternCanvas = document.createElement("canvas");
	const patternCtx = patternCanvas.getContext("2d");

	if (!patternCtx) {
		return null;
	}

	// Set pattern canvas dimensions (small for tight hatching)
	patternCanvas.width = 8; // Size of one diagonal repetition
	patternCanvas.height = 8;

	// Draw diagonal lines on the pattern canvas
	patternCtx.beginPath();
	// Start from bottom-left
	patternCtx.moveTo(1, patternCanvas.height - 1);
	// Draw to top-right
	patternCtx.lineTo(patternCanvas.width - 1, 1);
	patternCtx.strokeStyle = color;
	patternCtx.lineWidth = 2;
	patternCtx.stroke();

	// Create the pattern from the offscreen canvas and memoize it
	const pattern = context.createPattern(patternCanvas, "repeat");

	if (pattern) {
		patterns[color] = pattern;
		return pattern;
	}
}

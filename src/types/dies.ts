export type DieState = "good" | "defective" | "partial" | "lost";

type Die = {
	x: number,
	y: number,
	width: number,
	height: number,
	key: number,
	dieState: DieState
};

export type FabResults = null | {
	totalDies: null | number,
	goodDies: null | number,
	defectiveDies: null | number;
	lostDies: null | number;
	partialDies: null | number;
	fabYield: null | number,
	dies: Array<Die>
};

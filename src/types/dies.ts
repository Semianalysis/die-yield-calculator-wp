export type DieState = "good" | "defective" | "partial" | "lost";

export type Die = {
	x: number,
	y: number,
	width: number,
	height: number,
	key: number | string,
	dieState: DieState
};

export type FabResults = null | {
	totalDies: number,
	goodDies: number,
	defectiveDies: number;
	lostDies: number;
	partialDies: number;
	fabYield: number,
	dies: Array<Die>
};

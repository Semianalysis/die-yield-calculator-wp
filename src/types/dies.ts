export type DieState = "good" | "defective" | "partial" | "lost";

export type Die = {
	x: number,
	y: number,
	width: number,
	height: number,
	key: number,
	dieState: DieState
};

export type FabResults = {
	totalDies: number,
	goodDies: number,
	fabYield: number,
	waferWidth: number,
	waferHeight?: number,
	dies: Array<Die>
};

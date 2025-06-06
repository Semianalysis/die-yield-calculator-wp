import { Position } from "./geometry";

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
	lostDies: number,
	partialDies: number,
	fabYield: number,
	diePerRow: number,
	diePerCol: number,
	dies: Array<Die>,
	fields: Array<Position>,
	fullShotCount: number,
	partialShotCount: number,
	reticleUtilization: number,
	dieCost?: number;
	trimmedFieldWidth: number;
	trimmedFieldHeight: number;
};

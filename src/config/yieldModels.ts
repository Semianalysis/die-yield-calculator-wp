/**
 * Available mathematical models for calculating yield
 */
type StandardYieldModel = {
	name: string;
	yield: (defects: number) => number;
};

type BoseEinsteinModel = {
	name: string;
	yield: (defects: number, criticalLayers: number) => number;
};

type ManualYieldModel = {
	name: string;
	yield: (manualYield: number) => number;
};

export type YieldModels = {
	poisson: StandardYieldModel;
	murphy: StandardYieldModel;
	rect: StandardYieldModel;
	moore: StandardYieldModel;
	seeds: StandardYieldModel;
	"bose-einstein": BoseEinsteinModel;
	manual: ManualYieldModel;
};

// Assign the strongly typed models
export const yieldModels: YieldModels = {
	poisson: {
		name: "Poisson Model",
		yield: (defects) => Math.exp(-defects),
	},
	murphy: {
		name: "Murphy's Model",
		yield: (defects) =>
			defects > 0 ? Math.pow((1 - Math.exp(-defects)) / defects, 2) : 1,
	},
	rect: {
		name: "Rectangular Model",
		yield: (defects) =>
			defects > 0 ? (1 - Math.exp(-2 * defects)) / (2 * defects) : 1,
	},
	moore: {
		name: "Moore's Model",
		yield: (defects) => Math.exp(-Math.sqrt(defects)),
	},
	seeds: {
		name: "Seeds Model",
		yield: (defects) => 1 / (1 + defects),
	},
	"bose-einstein": {
		name: "Bose-Einstein Model",
		// Simplistic model that assumes the same number of defects in each layer
		yield: (defects, criticalLayers) =>
			Math.pow(1 / (1 + defects), criticalLayers),
	},
	manual: {
		name: "Manual",
		yield: (manualYield) => manualYield / 100,
	},
};

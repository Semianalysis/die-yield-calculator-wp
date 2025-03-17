/**
 * Available mathematical models for calculating yield
 */

// Define a general yield function type for most models
type YieldFunction = (defects: number) => number;

// Define a specific yield function type for Bose-Einstein that requires criticalLayers
type BoseEinsteinYieldFunction = (
	defects: number,
	criticalLayers: number,
) => number;

// Define the structure of standard yield models
type StandardYieldModel = {
	name: string;
	yield: YieldFunction;
};

// Define the structure of the Bose-Einstein model
type BoseEinsteinModel = {
	name: string;
	yield: BoseEinsteinYieldFunction;
};

// Define the entire model structure using a discriminated union
export type YieldModels = {
	poisson: StandardYieldModel;
	murphy: StandardYieldModel;
	rect: StandardYieldModel;
	moore: StandardYieldModel;
	seeds: StandardYieldModel;
	"bose-einstein": BoseEinsteinModel;
};

// Assign the strongly typed models
export const yieldModels: YieldModels = {
	poisson: {
		name: "Poisson Model",
		yield: (defects) => Math.exp(-defects),
	},
	murphy: {
		name: "Murphy's Model",
		yield: (defects) => Math.pow((1 - Math.exp(-defects)) / defects, 2),
	},
	rect: {
		name: "Rectangular Model",
		yield: (defects) => (1 - Math.exp(-2 * defects)) / (2 * defects),
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
		yield: (defects, criticalLayers) =>
			Math.pow(1 / (1 + defects), criticalLayers),
	},
};

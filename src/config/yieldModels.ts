/**
 * Available mathematical models for calculating yield
 */
export const yieldModels : {
	[model: string]: {
		name: string
		yield: (defects: number) => number
	},
} = {
	poisson: {
		name: "Poisson Model",
		yield: (defects) => Math.exp(-defects)
	},
	murphy: {
		name: "Murphy's Model",
		yield: (defects) => Math.pow(((1 - Math.exp(-defects)) / defects), 2)
	},
	rect: {
		name: "Rectangular Model",
		yield: (defects) => (1 - Math.exp(-2 * defects)) / (2 * defects)
	},
	//moore: {name: "Moore's Model"},
	seeds: {
		name: "Seeds Model",
		yield: (defects) => 1 / (1 + defects)
	}
};

module.exports = {
	preset: "ts-jest",
	roots: ["<rootDir>/src"],
	setupFilesAfterEnv: ["./test/setupTests.ts"],
	moduleNameMapper: {
		"^.+\\.s?css$": "identity-obj-proxy",
		"\\.svg$": "<rootDir>/src/__mocks__/svgMock.js",
	},
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportConditions: [""],
	},
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(png|svg)$": "jest-transform-stub",
	},
};

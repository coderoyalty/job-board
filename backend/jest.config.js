// jest.config.js
// const tsconfigPaths = require("tsconfig-paths");

// const { baseUrl, paths } = require("./tsconfig.json").compilerOptions;

// tsconfigPaths.register({
// 	baseUrl,
// 	paths,
// });

const path = require("path");

module.exports = {
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	preset: "ts-jest",
	testEnvironment: "node",
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	maxWorkers: 1,
};

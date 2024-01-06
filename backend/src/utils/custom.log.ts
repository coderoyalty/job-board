import config from "./config";

export const customLog = (...args: any[]): void => {
	if (config.enableLogging) {
		console.log(...args);
	}
};

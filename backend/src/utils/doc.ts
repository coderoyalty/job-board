import path from "path";
import fs from "fs";
import YAML from "yamljs";

//NOTICE: this hacky...
// if you don't understand, leave it...

const listFiles = (dirPath: string) => {
	const pathsDir = path.join(__dirname, dirPath);
	const result = [];
	try {
		const files = fs.readdirSync(pathsDir);
		result.push(...files);
	} catch (err) {
		console.error(err);
	}

	return result;
};

const filterFiles = (files: string[], relative: string) => {
	const result = [];

	for (let file of files) {
		const chunks = file.split(".");
		if (chunks.at(-1) === "yaml") {
			result.push(path.join(relative, file));
		}
	}

	return result;
};

const listFilesInPath = (
	version: string = "v0",
	pathType: "paths" | "components" = "paths",
) => {
	const dir = `../../docs/${version}/${pathType}`;

	const pathName = path.join(__dirname, dir);

	const result = [];

	try {
		const files = fs.readdirSync(pathName);
		result.push(...files);
	} catch (err) {
		console.error(err);
	}

	return filterFiles(result, pathName);
};

const convertFromYAML = (
	version: string = "v0",
	pathType: "paths" | "components" = "paths",
) => {
	const files = listFilesInPath(version, pathType);

	const swaggerProps = [];

	for (let file of files) {
		const output = YAML.load(file);

		swaggerProps.push(output);
	}

	return swaggerProps;
};

const convertForPaths = (version: string = "v0") => {
	const props = convertFromYAML(version, "paths");

	const combinedProps = props.reduce((result, prop) => {
		return { ...result, ...prop.paths };
	}, {});

	return combinedProps;
};

const convertForComponents = (version: string = "v0") => {
	const props = convertFromYAML(version, "components");

	const combinedProps = props.reduce((result, prop) => {
		return { ...result, ...prop.components };
	}, {});

	return combinedProps;
};

export { convertForPaths, convertForComponents };

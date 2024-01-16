import { isValidObjectId } from "mongoose";

function isValidObjectIds(...ids: Array<string>) {
	for (let id of ids) {
		if (!isValidObjectId(id)) {
			return false;
		}
	}

	return true;
}

export { isValidObjectIds };

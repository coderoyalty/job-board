import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom.api";

class BadRequestError extends CustomAPIError {
	constructor(message: string, data?: Record<string, any>) {
		super(message, StatusCodes.BAD_REQUEST);
		if (data) {
			this.data = data;
		}
	}
}

export default BadRequestError;

import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom.api";

class NotFoundError extends CustomAPIError {
	constructor(message: string, data?: Record<string, any>) {
		super(message, StatusCodes.NOT_FOUND);

		if (data) {
			this.data = data;
		}
	}
}

export default NotFoundError;

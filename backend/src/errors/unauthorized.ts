import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom.api";

class UnauthorizedError extends CustomAPIError {
	constructor(message: string, data?: Record<string, any>) {
		super(message, StatusCodes.UNAUTHORIZED);

		if (data) {
			this.data = data;
		}
	}
}

export default UnauthorizedError;

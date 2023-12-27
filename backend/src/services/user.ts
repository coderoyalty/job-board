import { CustomAPIError } from "@/errors";
import User from "@/models/user";
import { CreateUserValidator } from "@/validators/user";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class UserService {
	static async createUser(data: z.infer<typeof CreateUserValidator>) {
		const existingUser = await User.findOne({ email: data.email });

		if (existingUser) {
			throw new CustomAPIError(
				"an account already exists with the provided email address",
				StatusCodes.CONFLICT,
			);
		}

		try {
			const user = await User.create(data);

			return user;
		} catch {
			throw new CustomAPIError("");
		}
	}
}

export default UserService;

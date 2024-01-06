import { CustomAPIError } from "@/errors";
import UnauthorizedError from "@/errors/unauthorized";
import User from "@/models/user";
import { CreateUserValidator, LoginValidator } from "@/validators/user";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class AuthService {
	static async createAuthToken(data: z.infer<typeof LoginValidator>) {
		const user = await User.findOne({ email: data.email });

		if (!user) {
			throw new UnauthorizedError("Invalid Credentials.");
		}

		const pwdCorrect = await user.isValidPassword(data.password);

		if (!pwdCorrect) {
			throw new UnauthorizedError("Invalid Credentials.");
		}

		const token = user.createJWT();

		return token;
	}

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

export default AuthService;

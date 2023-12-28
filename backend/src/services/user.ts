import { CustomAPIError } from "@/errors";
import Candidate from "@/models/candidate";
import Employer from "@/models/employer";
import User, { Role } from "@/models/user";
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

	static async getUserAndRole(id: string) {
		const user = await User.findById(id);

		if (!user) {
			throw new CustomAPIError(
				"Couldn't find a user with the provided identifier",
				StatusCodes.NOT_FOUND,
			);
		}

		let roleValue = null;

		if (user.role === Role.CANDIDATE) {
			roleValue = await Candidate.findOne({
				user: user.id,
			});
		} else {
			roleValue = await Employer.findOne({
				user: user.id,
			});
		}

		return { user, data: roleValue };
	}
}

export default UserService;

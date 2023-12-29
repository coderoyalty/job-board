import { CustomAPIError, NotFoundError } from "@/errors";
import Candidate from "@/models/candidate";
import Employer from "@/models/employer";
import User, { Role } from "@/models/user";
import { CandidateValidator, EmployerValidator } from "@/validators/user";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

class UserService {
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

	static async createUserRole(
		userId: string,
		data:
			| z.infer<typeof CandidateValidator>
			| z.infer<typeof EmployerValidator>,
	) {
		const user = await User.findById(userId);

		if (!user) {
			throw new NotFoundError("Couldn't find any user with the provided id");
		}

		let roleData = null;
		if (user.role === Role.CANDIDATE) {
			roleData = await Candidate.create({ ...data, user: user.id });
		} else {
			roleData = await Employer.create({ ...data, user: user.id });
		}

		await roleData.save();

		return {
			user,
			roleData,
		};
	}
}

export default UserService;

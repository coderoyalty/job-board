import { CustomAPIError } from "@/errors";
import Candidate from "@/models/candidate";
import Employer from "@/models/employer";
import User, { Role } from "@/models/user";
import { StatusCodes } from "http-status-codes";

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
}

export default UserService;

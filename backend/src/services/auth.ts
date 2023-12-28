import UnauthorizedError from "@/errors/unauthorized";
import User from "@/models/user";
import { LoginValidator } from "@/validators/user";
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
}

export default AuthService;

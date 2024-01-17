import { z } from "zod";
import { Role } from "@/models/user";

const UserValidator = z.object({
	id: z.string().optional(),
	email: z.string().email(),
	role: z.nativeEnum(Role),
	password: z.string(),
});

const CreateUserValidator = UserValidator.omit({ id: true });
const LoginValidator = UserValidator.omit({ id: true, role: true });

const CandidateValidator = z.object({
	fullName: z.string(),
	location: z.string(),
	skills: z.string().array(),
	resume: z.string().url().optional(),
});

const EmployerValidator = z.object({
	companyName: z.string(),
	contactName: z.string(),
	companyLocation: z.string(),
	companyDescription: z.string(),
});

export default UserValidator;
export {
	CreateUserValidator,
	LoginValidator,
	CandidateValidator,
	EmployerValidator,
};

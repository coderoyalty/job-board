import express from "express";
import { CreateUserValidator, LoginValidator } from "@/validators/user";
import { BadRequestError } from "@/errors";

const validateRegistrationData = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const data = req.body;

	const output = CreateUserValidator.safeParse(data);

	if (output.success === false) {
		console.error(output.error);
		next(new BadRequestError("please provide all data correctly."));
	}

	next(null);
};

const validateLoginData = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const data = req.body;

	const output = LoginValidator.safeParse(data);

	if (!output.success) {
		next(new BadRequestError("please provide a correct email and password"));
	}

	next(null);
};

export { validateRegistrationData, validateLoginData };

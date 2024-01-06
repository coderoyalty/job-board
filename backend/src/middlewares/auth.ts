import express from "express";
import { CreateUserValidator, LoginValidator } from "@/validators/user";
import { BadRequestError } from "@/errors";
import { verifyToken } from "@/utils/jwt";
import { StatusCodes } from "http-status-codes";
import UnauthorizedError from "@/errors/unauthorized";
import { z } from "zod";
import { Role } from "@/models/user";
import AuthRequest from "@/interfaces/auth.request";

const validateRegistrationData = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const data = req.body;

	const output = CreateUserValidator.safeParse(data);

	if (output.success === false) {
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

const isLoggedIn = async (
	req: AuthRequest,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const token = req.cookies.token;
		const decoded = verifyToken(token);

		const data = { ...(decoded as Record<string, any>) };
		delete data.iat;
		delete data.exp;
		req.user = { ...data } as any;
		return next(null);
	} catch (error: any) {
		next(new UnauthorizedError("You're unauthorized for this action."));
	}
};

/**
 * this middleware restricts multiple login
 */
const isAlreadyLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	// proceed to the next handler if the token verification fails
	try {
		const token = req.cookies.token;
		verifyToken(token);
		return res.sendStatus(StatusCodes.NO_CONTENT);
	} catch (error: any) {
		next(null);
	}
};

export {
	validateRegistrationData,
	validateLoginData,
	isLoggedIn,
	isAlreadyLoggedIn,
};

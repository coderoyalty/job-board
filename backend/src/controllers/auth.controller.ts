import express from "express";
import Controller from "@/utils/controller.decorator";
import BaseController from "./base.controller";
import { Post } from "@/utils/route.decorator";
import UserService from "@/services/user";
import {
	validateLoginData,
	validateRegistrationData,
} from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";
import AuthService from "@/services/auth";
import { verifyToken } from "@/utils/jwt";

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

@Controller()
export class AuthController extends BaseController {
	constructor() {
		super("/auth");
	}

	@Post("/register", validateRegistrationData)
	async create(req: express.Request, res: express.Response) {
		const body = req.body;

		const user = await UserService.createUser(body);

		res.status(StatusCodes.CREATED).json({
			data: user,
			message: "User created successfully.",
			success: true,
		});
	}

	@Post("/login", isAlreadyLoggedIn, validateLoginData)
	async login(req: express.Request, res: express.Response) {
		const body = req.body;

		const token = await AuthService.createAuthToken(body);
		res.cookie("token", token, { httpOnly: true });

		res.status(StatusCodes.OK).json({
			message: "Login successfully",
			token,
		});
	}
}

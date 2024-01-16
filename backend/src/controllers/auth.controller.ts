import express from "express";
import Controller from "@/utils/controller.decorator";
import BaseController from "./base.controller";
import { Get, Post } from "@/utils/route.decorator";
import {
	isAlreadyLoggedIn,
	isLoggedIn,
	validateLoginData,
	validateRegistrationData,
} from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";
import AuthService from "@/services/auth";
import AuthRequest from "@/interfaces/auth.request";

@Controller()
export class AuthController extends BaseController {
	constructor() {
		super("/auth");
	}

	@Post("/register", validateRegistrationData)
	async create(req: express.Request, res: express.Response) {
		const body = req.body;

		const user = await AuthService.createUser(body);

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

	@Post("/logout", isLoggedIn)
	@Get("/logout", isLoggedIn)
	async logout(_req: AuthRequest, res: express.Response) {
		res.clearCookie("token");
		return res.status(StatusCodes.OK).json({ message: "Logout successfully." });
	}

	@Get("/me", isLoggedIn)
	async currentUser(req: AuthRequest, res: express.Response) {
		if (!req.user) return;

		const data = await AuthService.currentUser(req.user.id);

		return res.json({ ...data });
	}
}

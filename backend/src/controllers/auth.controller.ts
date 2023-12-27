import express from "express";
import Controller from "@/utils/controller.decorator";
import BaseController from "./base.controller";
import { Post } from "@/utils/route.decorator";
import UserService from "@/services/user";
import { validateRegistrationData } from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";

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
}

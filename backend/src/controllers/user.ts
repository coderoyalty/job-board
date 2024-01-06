import { Request, Response } from "express";
import Controller from "@/utils/controller.decorator";
import BaseController from "./base.controller";
import { Get, Post } from "@/utils/route.decorator";
import mongoose from "mongoose";
import { BadRequestError } from "@/errors";
import UserService from "@/services/user";
import { StatusCodes } from "http-status-codes";
import { isLoggedIn } from "@/middlewares/auth";
import { validateRoleData } from "@/middlewares/user";

@Controller()
export class UserController extends BaseController {
	constructor() {
		super("/users");
	}

	@Get("/:id")
	async get(req: Request, res: Response) {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			throw new BadRequestError("provided identifier is not valid");
		}

		const data = await UserService.getUserAndRole(id);

		return res.status(StatusCodes.OK).json({
			...data,
		});
	}

	@Post("/:id/role", isLoggedIn, validateRoleData)
	async createRole(req: Request, res: Response) {
		const { id } = req.params;
		const body = req.body;

		const data = await UserService.createUserRole(id, body);
		return res.status(StatusCodes.CREATED).json({
			message: "Created Role information successfully.",
			data,
		});
	}
}

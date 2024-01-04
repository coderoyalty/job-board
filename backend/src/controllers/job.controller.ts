import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "@/utils/controller.decorator";
import { Delete, Get, Post, Put } from "@/utils/route.decorator";
import AuthRequest from "@/interfaces/auth.request";
import { isLoggedIn } from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";
import JobService from "@/services/job";
import { BadRequestError } from "@/errors";
import mongoose from "mongoose";

@Controller()
export class JobController extends BaseController {
	constructor() {
		super("/jobs");
	}

	@Post("/", isLoggedIn)
	async createJob(req: AuthRequest, res: Response) {
		return res.sendStatus(StatusCodes.CREATED);
	}

	@Get("/")
	async getJobs(req: Request, res: Response) {
		const jobs = await JobService.findAll({});
		return res.json({
			...jobs,
		});
	}

	@Get("/:id")
	async getJob(req: Request, res: Response) {
		const { id } = req.params;

		const job = await JobService.find(id);

		return res.status(StatusCodes.OK).json({
			data: job,
		});
	}

	@Put("/:id", isLoggedIn)
	async updateJob(req: AuthRequest, res: Response) {
		return res.sendStatus(StatusCodes.OK);
	}

	@Delete("/:id", isLoggedIn)
	async deleteJob(req: AuthRequest, res: Response) {
		return res.sendStatus(StatusCodes.OK);
	}
}

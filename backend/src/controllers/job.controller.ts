import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "@/utils/controller.decorator";
import { Delete, Get, Post, Put } from "@/utils/route.decorator";
import AuthRequest from "@/interfaces/auth.request";
import { isLoggedIn } from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";
import JobService from "@/services/job";
import { validateJobData, isEligibleToApply } from "@/middlewares/job";
import { JobValidator } from "@/validators/job";
import mongoose from "mongoose";
import { BadRequestError } from "@/errors";

@Controller()
export class JobController extends BaseController {
	constructor() {
		super("/jobs");
	}

	@Post("/", isLoggedIn, validateJobData)
	async createJob(req: AuthRequest, res: Response) {
		const output = JobValidator.safeParse(req.body);
		const data = (output as any).data;

		if (!req.user) {
			return;
		}

		const job = await JobService.create({ ...data }, req.user.id);

		return res.status(StatusCodes.CREATED).json({
			data: job,
			message: "Successfully created a new job listing",
		});
	}

	@Get("/")
	async getJobs(req: Request, res: Response) {
		const { page = "1", limit = "10", location, title, latest } = req.query;

		const query: Record<string, any> = {};

		if (location) {
			query.location = new RegExp(location as string, "i");
		}
		if (title) {
			query.title = new RegExp(title as string, "i");
		}

		let jobs;

		if (latest !== undefined) {
			jobs = await JobService.findAll(query, Number(page), Number(limit), true);
		} else {
			jobs = await JobService.findAll(query, Number(page), Number(limit));
		}

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
		const { id } = req.params;
		const body = req.body;

		if (!req.user) {
			return;
		}

		const updatedJob = await JobService.update(id, req.user.id, body);

		return res.status(StatusCodes.OK).json({
			message: "Successfully updated a job listing",
			data: updatedJob,
		});
	}

	@Delete("/:id", isLoggedIn)
	async deleteJob(req: AuthRequest, res: Response) {
		const { id } = req.params;
		if (!req.user) {
			return;
		}
		const acknowledge = await JobService.remove(id, req.user.id);

		if (!acknowledge) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
				message: "the server was unable to perform this action",
			});
		} else {
			return res.sendStatus(StatusCodes.NO_CONTENT);
		}
	}

	@Post("/:id/apply", isLoggedIn, isEligibleToApply)
	async applyForJob(req: AuthRequest, res: Response) {
		if (!req.user) {
			return;
		}

		const { id } = req.params;

		if (!mongoose.isValidObjectId(id)) {
			throw new BadRequestError("provided identifier is not valid");
		}

		const application = await JobService.applyForJob(id as string, req.user.id);

		return res.status(StatusCodes.CREATED).json({
			message: "your application was successful",
			data: application,
		});
	}
}

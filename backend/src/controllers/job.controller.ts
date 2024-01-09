import { Request, Response } from "express";
import BaseController from "./base.controller";
import Controller from "@/utils/controller.decorator";
import { Delete, Get, Post, Put } from "@/utils/route.decorator";
import AuthRequest from "@/interfaces/auth.request";
import { isLoggedIn } from "@/middlewares/auth";
import { StatusCodes } from "http-status-codes";
import JobService from "@/services/job";
import { validateJobData } from "@/middlewares/job";
import { JobUpdateValidator, JobValidator } from "@/validators/job";

@Controller()
export class JobController extends BaseController {
	constructor() {
		super("/jobs");
	}

	@Post("/", isLoggedIn, validateJobData)
	async createJob(req: AuthRequest, res: Response) {
		const output = JobValidator.safeParse(req.body);
		const data = (output as any).data;

		const job = await JobService.create({ ...data, employer: req.user?.id });

		return res.status(StatusCodes.CREATED).json({
			data: job,
			message: "Successfully created a new job listing",
		});
	}

	@Get("/")
	async getJobs(req: Request, res: Response) {
		const {
			page = "1",
			limit = "10",
			order = "asc",
			location,
			title,
		} = req.query;

		let asc = 1;
		if (order === "desc") {
			asc = -1;
		}

		const query: Record<string, any> = {};

		if (location) {
			query.location = new RegExp(location as string, "i");
		}
		if (title) {
			query.title = new RegExp(title as string, "i");
		}

		const jobs = await JobService.findAll(
			query,
			Number(page),
			Number(limit),
			asc,
		);
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
}

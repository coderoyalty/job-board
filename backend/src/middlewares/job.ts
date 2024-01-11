import AuthRequest from "@/interfaces/auth.request";
import express from "express";
import { JobValidator } from "@/validators/job";
import { Role } from "@/models/user";
import { BadRequestError, CustomAPIError } from "@/errors";
import { StatusCodes } from "http-status-codes";

const validateJobData = async (
	req: AuthRequest,
	_res: express.Response,
	next: express.NextFunction,
) => {
	if (req.user?.role !== Role.EMPLOYER) {
		next(
			new CustomAPIError(
				"You're restricted from the action",
				StatusCodes.FORBIDDEN,
			),
		);
	}

	const output = JobValidator.safeParse(req.body);
	if (!output.success) {
		next(new BadRequestError("please provide correct information"));
	}
	next(null);
};

const isEligibleToApply = async (
	req: AuthRequest,
	_res: express.Response,
	next: express.NextFunction,
) => {
	if (req.user?.role !== Role.CANDIDATE) {
		next(
			new CustomAPIError(
				"An account with employer role cannot apply for a job",
				StatusCodes.FORBIDDEN,
			),
		);
	}

	next(null);
};

export { validateJobData, isEligibleToApply };

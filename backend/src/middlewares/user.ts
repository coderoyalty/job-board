import { BadRequestError, CustomAPIError, UnauthorizedError } from "@/errors";
import AuthRequest from "@/interfaces/auth.request";
import Candidate from "@/models/candidate";
import Employer from "@/models/employer";
import { Role } from "@/models/user";
import { CandidateValidator, EmployerValidator } from "@/validators/user";
import express from "express";
import { StatusCodes } from "http-status-codes";

const validateRoleData = async (
	req: AuthRequest,
	_res: express.Response,
	next: express.NextFunction,
) => {
	const { id } = req.params;
	const body = req.body;
	const currentUser = req.user;

	// The `isLoggedIn` middleware ensures that only authenticated users can access this endpoint.
	// If the user is not authenticated, it responds with an UnauthorizedError, prompting them to log in.
	if (!currentUser) {
		return next(new UnauthorizedError("Unauthorized action. Please log in."));
	}

	if (currentUser.id !== id) {
		return next(new UnauthorizedError("Unauthorized action. Please log in."));
	}

	// find any existing role data
	let existingRoleData = null;
	if (currentUser.role === Role.CANDIDATE) {
		existingRoleData = await Candidate.findOne({ user: currentUser.id });
	} else {
		existingRoleData = await Employer.findOne({ user: currentUser.id });
	}

	// Ensure that duplicate roles are not created for a user.
	if (existingRoleData) {
		return next(
			new CustomAPIError(
				"Role information already exists. Please update instead of creating a new role.",
				StatusCodes.CONFLICT,
			),
		);
	}

	// validate the request body

	let output = null;
	if (currentUser.role === Role.CANDIDATE) {
		output = CandidateValidator.safeParse(body);
	} else {
		output = EmployerValidator.safeParse(body);
	}

	if (!output.success) {
		return next(new BadRequestError("please provide correct information"));
	}

	return next();
};

export { validateRoleData };

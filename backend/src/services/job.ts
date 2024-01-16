import { BadRequestError, CustomAPIError, NotFoundError } from "@/errors";
import Candidate from "@/models/candidate";
import Employer from "@/models/employer";
import JobApplication from "@/models/job.application";
import JobListing from "@/models/job.listing";
import { JobUpdateValidator, JobValidator } from "@/validators/job";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { z } from "zod";

class JobService {
	static async create(data: z.infer<typeof JobValidator>, id: string) {
		const employer = await Employer.findOne({
			user: id,
		});

		if (!employer) {
			throw new NotFoundError(
				"The user does not have a role model yet. Please create a role for the user.",
			);
		}

		const job = await JobListing.create({ ...data, employer: employer.id });

		if (!job) {
			throw new CustomAPIError("Couldn't create a job", 500);
		}

		await employer.updateOne({
			$push: {
				jobListings: job._id,
			},
		});

		return job;
	}

	static async find(id: string) {
		if (!mongoose.isValidObjectId(id)) {
			throw new BadRequestError("provided identifier is not valid");
		}

		const job = await JobListing.findById(id);

		if (!job) {
			throw new NotFoundError("Couldn't find a job with the provided id");
		}

		return job;
	}

	static async findAll(
		query: Record<string, string>,
		page: number,
		limit: number,
		latest = false,
	) {
		const skip = (page - 1) * limit;
		const jobListingsWithCount = await JobListing.aggregate([
			{ $match: { ...query } },
			{ $sort: { createdAt: latest ? -1 : 1 } },
			{ $skip: skip },
			{ $limit: limit },
			{
				$addFields: {
					applicants: { $size: "$applications" },
				},
			},
			{ $unset: "applications" },
		]).exec();

		const transformedJobListings = jobListingsWithCount.map(
			(doc: { _id: any }) => ({
				...doc,
				id: doc._id,
				_id: undefined,
				__v: undefined,
			}),
		);

		const totalDocs = await JobListing.countDocuments().exec();
		const totalPages = Math.ceil(totalDocs / limit);

		const hasNextPage = page < totalPages;
		const hasPrevPage = page > 1;

		const data = {
			data: transformedJobListings,
			total: totalDocs,
			pages: totalPages,
			count: jobListingsWithCount.length,
			prev: null,
			next: null,
		};

		if (hasNextPage) {
			(data as any).next = page + 1;
		}
		if (hasPrevPage) {
			(data as any).prev = page - 1;
		}

		return data;
	}

	static async update(id: string, userId: string, data: Record<string, any>) {
		if (!mongoose.isValidObjectId(id)) {
			throw new BadRequestError("provided identifier is not valid");
		}

		const output = JobUpdateValidator.safeParse(data);
		if (!output.success) {
			throw new BadRequestError("please provide a valid data");
		}

		const job = await JobListing.findById(id);
		if (!job) {
			throw new NotFoundError("Couldn't find a job with the provided id");
		}

		if (String(job.employer) !== userId) {
			throw new CustomAPIError(
				"You can't perform from this action",
				StatusCodes.FORBIDDEN,
			);
		}

		await job.updateOne(output.data);
		return await JobListing.findById(id);
	}

	static async remove(id: string, userId: string) {
		if (!mongoose.isValidObjectId(id)) {
			throw new BadRequestError("provided identifier is not valid");
		}

		const existingJob = await JobListing.findById(id);

		if (!existingJob) {
			throw new NotFoundError("Couldn't find a job with the provided id");
		}

		if (String(existingJob.employer) !== userId) {
			throw new CustomAPIError(
				"You can't perform from this action",
				StatusCodes.FORBIDDEN,
			);
		}

		const op = await existingJob.deleteOne();
		return op.acknowledged;
	}

	static async applyForJob(jobId: string, applicantId: string) {
		const applicant = await Candidate.findOne({
			user: applicantId,
		});

		if (!applicant) {
			throw new NotFoundError(
				"The user does not have a role model yet. Please create a role for the user.",
			);
		}

		//1. avoid duplicating a job application

		let application = await JobApplication.findOne({
			jobListing: jobId,
			candidate: applicant.id,
		});

		if (application) {
			throw new CustomAPIError( //TODO: create custom Conflict class
				"The user have already applied for this job. Can't apply again",
				StatusCodes.CONFLICT,
			);
		}

		//2. create the job application

		application = await JobApplication.create({
			jobListing: jobId,
			candidate: applicant.id,
		});

		if (!application) {
			throw new CustomAPIError(
				"Something happened at our end, we couldn't apply for you.",
			);
		}

		//3. update the job listing

		const jobListing = await JobListing.findByIdAndUpdate(
			jobId,
			{
				$push: { applications: application._id },
			},
			{ new: true },
		);

		if (!jobListing) {
			throw new CustomAPIError(
				"Job listing not found. Unable to update applications.",
				StatusCodes.NOT_FOUND,
			);
		}

		//4. update the applicant (Candidate model)
		await applicant.updateOne({
			$push: { applications: application._id },
		});

		return await application.populate(["candidate", "jobListing"]);
	}
}

export default JobService;

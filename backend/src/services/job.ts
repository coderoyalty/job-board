import { BadRequestError, CustomAPIError, NotFoundError } from "@/errors";
import JobListing from "@/models/job.listing";
import { JobValidator } from "@/validators/job";
import { application } from "express";
import mongoose from "mongoose";
import { z } from "zod";

class JobService {
	static async create(data: z.infer<typeof JobValidator>) {
		const job = await JobListing.create({ ...data });

		if (!job) {
			throw new CustomAPIError("Couldn't create a job", 500);
		}

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

	static async update() {}

	static async remove() {}
}

export default JobService;

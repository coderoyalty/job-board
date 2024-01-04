import { BadRequestError, NotFoundError } from "@/errors";
import JobListing from "@/models/job.listing";
import mongoose from "mongoose";

class JobService {
	static async create() {}

	static async remove() {}

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

	static async update() {}

	static async findAll(
		query: Record<string, string>,
		page: number = 1,
		limit: number = 20,
	) {
		const skip = (page - 1) * limit;
		const jobListingsWithCount = await JobListing.aggregate([
			{ $match: query },
			{ $skip: skip },
			{ $limit: limit },
			{
				$addFields: {
					applicationsCount: { $size: "$applications" },
				},
			},
		]).exec();

		const totalDocs = await JobListing.countDocuments().exec();
		const totalPages = Math.ceil(totalDocs / limit);

		const hasNextPage = page < totalPages;
		const hasPrevPage = page > 1;

		const data = {
			data: jobListingsWithCount,
			total: totalDocs,
			pages: totalPages,
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
}

export default JobService;

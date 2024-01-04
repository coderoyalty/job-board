import { z } from "zod";

const JobValidator = z.object({
	title: z
		.string()
		.min(3)
		.max(72)
		.refine(data => data.trim().length > 0, {
			message: "title cannot be empty or contain only whitespace",
		}),
	description: z
		.string()
		.min(10)
		.max(256)
		.refine(data => data.trim().length > 0, {
			message: "description cannot be empty or contain only whitespace",
		}),
	company: z
		.string()
		.max(128)
		.refine(data => data.trim().length > 0, {
			message: "company cannot be empty or contain only whitespace",
		}),
	location: z
		.string()
		.max(128)
		.refine(data => data.trim().length > 0, {
			message: "location cannot be empty or contain only whitespace",
		}),
	deadline: z.number().min(0).optional(),
	salary: z.number().min(-1).max(10_000_000).optional(), //TODO: 10million as maximum bawo 😒🤪
});

export { JobValidator };

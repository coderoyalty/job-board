import mongoose from "mongoose";

interface IJobApplication extends mongoose.Document {}

const jobApplicationSchema = new mongoose.Schema(
	{
		candidate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Candidate",
		},
		jobListing: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "JobListing",
		},
	},
	{ timestamps: true },
);

jobApplicationSchema.set("toJSON", {
	transform(doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;

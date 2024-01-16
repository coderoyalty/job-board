import mongoose from "mongoose";

interface IJobListing {
	id: string;
	title: string;
	description: string;
	location: string;
	deadline: Date;
	employer: mongoose.Types.ObjectId;
	applications: Array<mongoose.Types.ObjectId>;
	salary: number;
	company: string;
}

const defaultDuration = () => Date.now() + 1000 * 60 * 60 * 24 * 7; // a week

const jobListingDefinition = {
	title: { type: String, required: true },
	description: { type: String, required: true },
	location: { type: String },
	deadline: {
		type: Date,
		default: new Date(defaultDuration()),
	},
	salary: {
		type: Number,
		required: false,
	},
	company: {
		type: String,
		required: true,
	},
	employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
	applications: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" },
	],
};

const jobListingSchema = new mongoose.Schema(jobListingDefinition, {
	timestamps: true,
});

jobListingSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

const JobListing = mongoose.model<IJobListing>("JobListing", jobListingSchema);

export default JobListing;

import mongoose from "mongoose";

interface IEmployer extends Document {
	id: string;
	companyName: string;
	contactName: string;
	companyLocation: string;
	companyDescription: string;
	jobListings: Array<mongoose.Types.ObjectId>;
	user: mongoose.Types.ObjectId | string | null;
}

const employerSchema = new mongoose.Schema<IEmployer>(
	{
		companyName: {
			type: String,
			required: true,
		},
		contactName: {
			type: String,
			required: true,
		},
		companyLocation: {
			type: String,
			default: null,
		},
		companyDescription: {
			type: String,
			default: null,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		jobListings: {
			type: [{ type: mongoose.Types.ObjectId, ref: "JobListing" }],
			default: function () {
				return [];
			},
		},
	},
	{ timestamps: true },
);

const Employer = mongoose.model<IEmployer>("Employer", employerSchema);
export { employerSchema };
export default Employer;

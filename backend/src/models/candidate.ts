import mongoose from "mongoose";

interface ICandidate extends mongoose.Document {
	id: string;
	fullName: string;
	location: string;
	skills: string[];
	resume: string;
	user: mongoose.Types.ObjectId | string | null;
	applications: Array<mongoose.Types.ObjectId>;
}

const candidateDefinition = {
	fullName: {
		type: String,
		required: true,
	},
	location: { type: String, required: true },
	skills: {
		type: [String],
		default: [],
	},
	resume: {
		type: String,
		default: "",
	},
	applications: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" }],
		default: function () {
			return [];
		},
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
};

const candidateSchema = new mongoose.Schema<ICandidate>(candidateDefinition, {
	timestamps: true,
});

candidateSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	},
});

candidateSchema.index({ skills: 1 });

const Candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default Candidate;

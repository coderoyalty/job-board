import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

enum Role {
	CANDIDATE = "candidate",
	EMPLOYER = "employer",
}

interface IUser extends Document {
	id: string;
	email: string;
	password: string;
	role: Role;

	isValidPassword(password: string): Promise<boolean>;
	createJWT(): string;
}

interface IUserModel extends Model<IUser> {
	isValidPassword(password: string): Promise<boolean>; // Extend Model interface
	createJWT(): string;
}

const userDefinition = {
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	role: {
		type: String,
		enum: Object.values(Role),
		default: Role.CANDIDATE,
		required: true,
	},
	password: { type: String, required: true },
};

const userSchema = new Schema<IUser, IUserModel>(userDefinition, {
	timestamps: true,
});

// this method will hash the password before saving it...
userSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const hash = await bcrypt.hash(this.password, 10);
			this.password = hash;
		}
		next();
	} catch (error: any) {
		next(error);
	}
});

// add a method for validating the password field
userSchema.methods.isValidPassword = async function (
	password: string,
): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJWT = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			role: this.role,
		},
		"",
		{
			expiresIn: process.env.JWT_DURATION || "1h",
		},
	);
};

// replace _id with id
userSchema.set("toJSON", {
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.password;
		delete ret.__v;
	},
});

// db indexes
userSchema.index({ email: 1 });

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);

export { Role };
export default User;

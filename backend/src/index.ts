import "./app";
import "module-alias/register";
import "@/controllers";
import App from "@/app";
import connectDB from "./utils/database";
import User, { Role } from "./models/user";

const app = App.getInstance();
//.. your database connections and other configurations can happen here!

// run the application
// const server = app.run();

connectDB().catch(() => {
	process.exit(0);
});

async function createUserAndRole(email: string, password: string, role: Role) {
	try {
		// Create a new user
		const newUser = new User({
			email,
			password,
			role,
		});

		// Save the user to the database
		const savedUser = await newUser.save();

		// console.log(savedUser);

		console.log(
			`User with id ${savedUser.id} created successfully with role: ${role}`,
		);
	} catch (error: any) {
		console.error("Error creating user:", error.message);
	}
}

// Example usage:
const email = "user@example.com";
const password = "securePassword";

// Create a user with the "candidate" role
createUserAndRole(email, password, Role.CANDIDATE);

// Create a user with the "employer" role
createUserAndRole(email, password, Role.EMPLOYER);

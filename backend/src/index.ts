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

const server = app.run();

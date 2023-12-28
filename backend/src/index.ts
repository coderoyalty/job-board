import "./app";
import "module-alias/register";
import dotenv from "dotenv";
import "@/controllers";
import App from "@/app";
import connectDB from "./utils/database";
dotenv.config();

const app = App.getInstance();
//.. your database connections and other configurations can happen here!

// run the application
connectDB().catch(() => {
	process.exit(0);
});

const server = app.run();

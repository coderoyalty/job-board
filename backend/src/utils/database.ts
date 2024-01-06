import mongoose, { Connection } from "mongoose";
import config from "./config";
import { customLog } from "./custom.log";

const connectDB = async (): Promise<Connection> => {
	try {
		const url = config.db.URI;
		const connection = await mongoose.connect(url, {
			appName: config.db.NAME,
		});
		customLog("✅ - Database connection was successful");
		return connection.connection;
	} catch (error) {
		customLog("Error connecting to the database:", error);
		throw error;
	}
};

export default connectDB;

import mongoose, { Connection } from "mongoose";

const connectDB = async (dbName?: string): Promise<Connection> => {
	try {
		const url = `mongodb://localhost:27017/${dbName || "your-database-name"}`;
		const connection = await mongoose.connect(url, {
			appName: "CodsoftJobBoard",
		});
		console.log("✅ - Database connection was successful");
		return connection.connection;
	} catch (error) {
		console.error("Error connecting to the database:", error);
		throw error;
	}
};

export default connectDB;

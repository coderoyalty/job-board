import mongoose, { Connection } from "mongoose";

const connectDB = async (): Promise<Connection> => {
	try {
		const url = "mongodb://localhost:27017/your-database-name";
		const connection = await mongoose.connect(url, {
			appName: "CodsoftJobBoard",
		});
		return connection.connection;
	} catch (error) {
		console.error("Error connecting to the database:", error);
		throw error;
	}
};

export default connectDB;

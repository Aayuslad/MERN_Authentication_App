import mongoose from "mongoose";

export default async function connect() {
	try {
        // Connecting to database
		await mongoose.connect(process.env.DB_URL);
		// console.log("Connected to database");
	} catch (error) {
		// console.log("Error while connecting to database", error);
	}
}

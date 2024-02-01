import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API,
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		// Cheking if file exist or not in server
		if (!localFilePath) return null;

		// Uploading file on cloud
		const res = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
		});

		console.log("File is uploaded in cludinary", res);
		return res;
	} catch (error) {
		// Deleting temporaray saved file from server
		fs.unlinkSync(localFilePath);
		return null;
	}
};

export default uploadOnCloudinary

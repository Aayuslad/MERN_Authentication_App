import mongoose from "mongoose";

// creating user's schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: { type: String, require: true },
	email: { type: String, require: true },
	firstName: String,
	lastName: String,
	mobile: Number,
	address: String,
	profile: String,
});


// Creating user's model
const User = mongoose.model("User", userSchema);

export default mongoose.model.Users || User;

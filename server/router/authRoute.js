import { Router } from "express";
import * as userController from "../controller/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router
	.post("/register", userController.register) // Register the user
	.post("/login", userController.login) // Log in to the app
	.post("/generateOtp", userController.generateOTP); // Generate random OTP

router
	.get("/logout", userController.logout) // Log out
	.get("/profile", authMiddleware, userController.getUser) // Get user profile by username
	.get("/verifyOtp", userController.verifyOTP); // Verify the OTP sent to the user's email

router
	.put("/updateUser", authMiddleware, userController.updateUser) // Update user profile
	.put("/resetPassword", userController.resetPassword); // Reset the password

export default router;

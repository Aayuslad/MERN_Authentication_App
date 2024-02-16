import { Router } from "express";
import * as userController from "../controller/userController.js";
// middlewares
import sessionMiddleware from "../middlewares/sessionMiddleware.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js"

const router = Router();

router
	.post("/register", upload.single("profile"), userController.register) // Register the user
	.post("/login", userController.login) // Log in to the app
	.post("/generateOtp", sessionMiddleware, userController.generateOTP) // Generate random OTP
	.post("/logout", userController.logout); // Log out

router
	.get("/profile", authMiddleware, userController.getUser) // Get user profile by username
	.get("/verifyOtp", sessionMiddleware, userController.verifyOTP); // Verify the OTP sent to the user's email

router
	.put("/updateUser", upload.single("profile"), authMiddleware, userController.updateUser) // Update user profile
	.put("/resetPassword", sessionMiddleware, userController.resetPassword); // Reset the password

export default router;

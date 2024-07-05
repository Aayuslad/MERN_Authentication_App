import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import User from "../model/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// POST: http://localhost:8080/user/register
// body : {
//   "username" : "example123",
//   "password" : "admin123",
//   "email": "example@gmail.com",
//   "profile": ""
// }
export const register = async (req, res) => {
	const { username, password, email } = req.body;
	let secureUrl = "";
	let publicId = "";

	try {
		// Check if the username already exists
		const userByUsername = await User.findOne({ username });
		if (userByUsername) return res.status(400).json({ error: "Username alredy exists" });

		// Check for repeated email
		const userByEmail = await User.findOne({ email });
		if (userByEmail) return res.status(400).json({ error: "User already exists with this email" });

		// Uploading image on cloudinary
		const response = await uploadOnCloudinary(req.file?.path);
		secureUrl = response?.secure_url;
		publicId = response?.public_id;

		// Hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// creating new user
		await User.create({ username, password: hashedPassword, email, profile: secureUrl, publicId });
		res.status(201).json({
			message: "Successfully registered",
		});
	} catch (error) {
		// console.log("Error while logging in : ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

// POST: http://localhost:8080/user/login
// Body: {
//   "username": "example123",
//   "password": "admin123"
// }
export const login = async (req, res) => {
	const { username, password, token } = req.body;

	console.log(req.body);

	const formData = new FormData();
	formData.append("secret", process.env.RECAPTCHA_SECRET_KEY);
	formData.append("response", token);

	try {
		const captcha = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			body: formData,
		});

		const captchaResult = await captcha.json();
		if (captchaResult.success === false) return res.status(401).json({ error: "Captcha Failed" });

		// Checking if a user exists with this username
		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: "Username does not exist" });

		// Checking the password
		const passwordCheck = await bcrypt.compare(password, user.password);
		if (!passwordCheck) return res.status(401).json({ error: "Incorrect password" });

		// Creating an Authorization token
		const jwtToken = jwt.sign(
			{
				user_Id: user._id,
				username: user.username,
				email: user.email,
			},
			process.env.SECRET,
			{
				expiresIn: "7d",
			},
		);

		// Sending the Authorization token
		return res
			.cookie("Authorization", jwtToken, {
				// domain: "mern-authentication-app-frontend.vercel.app",
				httpOnly: true,
				secure: true,
				sameSite: "none",
			})
			.status(200)
			.json({ message: "Logged in successfully" });
	} catch (error) {
		console.log("Error while logging in : ", error);
		return res.status(400).json({ error: "Error while logging in" });
	}
};

// POST : http://localhost:8080/user/logout
export const logout = async (req, res) => {
	try {
		// Clearing the Authorization cookie
		res.clearCookie("Authorization", {
			// domain: "mern-authentication-app-frontend.vercel.app",
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});

		// Sending a successful logout response
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		// console.log("Error while logging out : ", error);
		res.status(400).json({ error: "Error while logging out" });
	}
};

// GET: http://localhost:8080/user/profile
export const getUser = async (req, res) => {
	const { username } = req.user;

	try {
		// Checking if a user exists with this username
		let user = await User.findOne({ username }).lean();
		if (!user) return res.status(404).json({ error: "Username does not exist" });

		// Returning user info after removing the password
		delete user.password;
		return res.status(200).json(user);
	} catch (error) {
		// console.log("Error while finding user : ", error);
		return res.status(404).json({ error: "User not found" });
	}
};

// PUT: http://localhost:8080/user/updateUser
// Body: {
//   "firstName": "",
//   "lastName": "",
//   "address": "",
//   "mobile": "",
//   "profile": ""
// }
export const updateUser = async (req, res) => {
	const { user_Id } = req.user;
	const { firstName, lastName, address, mobile } = req.body;
	let secureUrl = "";
	let publicId = "";

	try {
		// updating profile pic on cloudinary
		const user = await User.findOne({ _id: user_Id });
		const response = await uploadOnCloudinary(req.file?.path, user.publicId);
		secureUrl = response?.secure_url;
		publicId = response?.public_id;

		// Finding the user by user id and updating fields
		await User.updateOne(
			{ _id: user_Id },
			{ firstName, lastName, address, mobile, profile: secureUrl, publicId },
		);
		return res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		console.log("Error while updating user : ", error);
		return res.status(400).json({ error: "User not updated" });
	}
};

// POST :http://localhost:8080/user/generateOTP
export const generateOTP = async (req, res) => {
	const email = req.body.email || req.session.email;

	// If the email exists in req, set it in a local variable
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ error: "Email doesn't exist" });
	req.session.email = email;

	// Generating a random OTP
	req.session.OTP = otpGenerator.generate(6, {
		lowerCaseAlphabets: false,
		upperCaseAlphabets: false,
		specialChars: false,
	});

	// Sending an email
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS,
		},
		from: process.env.EMAIL,
	});

	const emailBody = `
    <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow:auto; line-height:2">
      <div style="margin: 50px auto; width: 70%; padding: 20px 0">
        <div style="border-bottom: 1px solid #eee">
          <a href="" style="font-size: 1.4em; color: #00466a; text-decoration:none; font-weight:600">Notes</a>
        </div>
        <p style="font-size: 1.1em">Hi,</p>
        <p>Thank you for choosing Your Brand. Use the following OTP to complete your password update procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${req.session.OTP}</h2>
        <p style="font-size: 0.9em;">Regards,<br />Notes</p>
        <hr style="border:none; border-top: 1px solid #eee" />
        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
          <p>Notes</p>
          <p>Navsari, Gujarat</p>
          <p>India</p>
        </div>
      </div>
    </div>
  `;

	try {
		await transporter.sendMail({
			from: process.env.EMAIL,
			to: req.session.email,
			subject: "OTP Verification",
			html: emailBody,
		});
		res.status(200).json({ message: "Email sent successfully" });
	} catch (error) {
		// console.log("Error while sending email : ", error);
		res.status(400).json({ error: "Error while sending email" });
	}
};

// GET: http://localhost:8080/user/verifyOTP?code=659288
export const verifyOTP = async (req, res) => {
	const { code } = req.query;

	// Verifying OTP
	if (!(parseInt(code) === parseInt(req.session.OTP))) {
		return res.status(400).json({ error: "Invalid OTP" });
	}

	// Clearing the OTP in the session and marking the session for reset
	req.session.OTP = null;
	req.session.resetSession = true;

	res.status(200).json({ message: "OTP verification successful" });
};

// PUT:http://localhost:8080/user/resetPassword
export const resetPassword = async (req, res) => {
	const { password } = req.body;

	try {
		// Checking if the session is on or off
		if (!req.session.resetSession) return res.status(400).json({ error: "Session expired" });

		// Hashing the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Updating the password
		await User.updateOne({ email: req.session.email }, { password: hashedPassword });
		req.session.resetSession = false;
		req.session.email = "";
		res.clearCookie("connect.sid", {
			maxAge: 5 * 60 * 1000, // 5 minutes
			secure: true,
			httpOnly: true,
			sameSite: "none",
		});

		return res.status(200).json({ message: "Password updated successfully" });
	} catch (error) {
		// console.log("Error while updating password : ", error);
		return res.status(400).json({ error: "Error while updating the password" });
	}
};

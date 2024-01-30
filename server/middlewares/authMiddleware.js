import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
	const token = req.cookies.Authorization;

	// Check if the user has the Authorization cookie or not
	if (!token) return res.status(401).json({ message: "Login first" });

	// Verify the user
	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log("Error in auth middleware : ", error);
		return res.status(401).json( { message : "Unauthorized user" });
	}
};

export default verifyUser;

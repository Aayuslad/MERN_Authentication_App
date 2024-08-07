import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connect from "./database/connection.js";
import "dotenv/config";
import authRoute from "./router/authRoute.js";
const PORT = process.env.PORT || 8080;
const app = express();

// Server connection
connect();

// Set trust proxy
app.set("trust proxy", 1);

// Middlewares
app.use(
	cors({
		origin: ["https://mern-authentication-app-frontend.vercel.app", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.disable("x-powerd-by");
app.use(express.urlencoded({ extended: true }));

// API endpoints
app.get("/", (req, res) => {
	res.json({ message: "Server is started 😊" });
});
app.use("/user", authRoute);

// listning requests
app.listen(PORT, () => console.log(`Server started on port ${8080}`));

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connect from "./databse/connection.js"
import authRoute from './router/authRoute.js';
import 'dotenv/config'
import session from 'express-session';
const PORT = process.env.PORT || 8080;
const app = express();

// Server connection
connect()

// Middlewares
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"))
app.disable("x-powerd-by")

// Express session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
})) 

// API endpoints
app.use("/user", authRoute)

// listning requests
app.listen(PORT, () => console.log(`Server started on port ${8080}`))
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connect from "./databse/connection.js"
import authRoute from './router/authRoute.js';
import 'dotenv/config'
import session from 'express-session';
import MongoStore from 'connect-mongo';
const PORT = process.env.PORT || 8080;
const app = express();

// Server connection
connect()

// Set trust proxy
app.set("trust proxy", 1);

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
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DB_URL,
			autoRemove: "interval",
			autoRemoveInterval: 10, // In minutes. Default
		}),
		cookie: {
			secure: false,
			httpOnly: true,
			sameSite: "none",
		},
	}),
); 

// API endpoints
app.get("/", (req, res) => {
	res.json({ message: "Server is started 😊" });
});
app.use("/user", authRoute)

// listning requests
app.listen(PORT, () => console.log(`Server started on port ${8080}`))
import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = async (req, res, next) => {
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DB_URL,
			autoRemove: "interval",
			autoRemoveInterval: 60,
		}),
		cookie: {
			maxAge: 5 * 60 * 1000, // 5 minutes
			secure: true,
			httpOnly: true,
			sameSite: "none",
		},
	})(req, res, next);
};

export default sessionMiddleware;

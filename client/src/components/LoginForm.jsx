import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { loginFormValidation } from "../helper/validate";
import user from "../../public/icons/user.svg";
import password from "../../public/icons/password.svg"
import google_logo from "../../public/images/google_logo.png";
import github_logo from "../../public/images/github_logo.png";
import usersStore from "../stores/usersStore.js";

export default function LoginForm() {
	const navigate = useNavigate();
	const store = usersStore();

	const fromik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate: loginFormValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.login(values, navigate);
		},
	});

	return (
		<div className="LoginPage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Login to Notes</h2>
					<p>Explore more by connecting with us !</p>
				</div>

				<form className="form_body" onSubmit={fromik.handleSubmit}>
					<div className="inputs">
						<div className="input">
							<div className="icon">
								<img src={user} alt="" />
							</div>
							<input
								type="text"
								placeholder="Username"
								className="textBox"
								{...fromik.getFieldProps("username")}
							/>
						</div>
						<div className="input">
							<div className="icon">
								<img src={password} alt="" />
							</div>
							<input
								type="password"
								placeholder="password"
								className="textBox"
								{...fromik.getFieldProps("password")}
							/>
						</div>
						<Link className="link link-password" to="/forgotpassword">
							Forgot Password ?
						</Link>
					</div>

					<div className="buttons">
						<button className="btn submit" type="submit">
							<b>Log in</b>
						</button>
					</div>

					<div className="divider">
						<span>
							<div>OR</div>
						</span>
					</div>

					<div className="buttons continue-w">
						<button className="btn continue-w-google" type="button">
							<div className="logo">
								<img src={google_logo} alt="" />
							</div>
							<b>Coninue with Google</b>
						</button>
						<button className="btn continue-w-github" type="button">
							<div className="logo">
								<img src={github_logo} alt="" />
							</div>
							<b>Coninue with GitHub</b>
						</button>
					</div>
				</form>

				<div className="form_footer">
					Not a member?{" "}
					<Link className="link" to="/register">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}

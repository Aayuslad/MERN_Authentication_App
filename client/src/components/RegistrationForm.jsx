import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerFormValidation } from "../helper/validate";
import avatar from "../../public/images/profile.png";
import user from "../../public/icons/user.svg";
import email from "../../public/icons/email.svg";
import google_logo from "../../public/images/google_logo.png";
import github_logo from "../../public/images/github_logo.png";
import password from "../../public/icons/password.svg";
import usersStore from "../stores/usersStore";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterForm() {
	const navigate = useNavigate();
	const store = usersStore();
	const [token, setToken] = useState("");

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			profile: "",
			token: "",
		},
		validate: registerFormValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			const formData = new FormData();
			formData.append("email", values.email);
			formData.append("username", values.username);
			formData.append("password", values.password);
			formData.append("profile", values.profile || "");
			formData.append("token", values.token);
			store.register(formData, navigate);
		},
	});

	useEffect(() => {
		if (token) {
			formik.setFieldValue("token", token);
		}
	}, [token]);

	// Function to handle image uplod logic
	const onUpload = async (e) => {
		formik.setValues({ ...formik.values, profile: e.target.files[0] });
	};

	return (
		<div className="RegistrationPage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Register</h2>
					<p>Happy to join you</p>
				</div>

				<form className="form_body" onSubmit={formik.handleSubmit}>
					<div className="profile">
						<label htmlFor="profile">
							<img
								src={
									formik.values.profile
										? URL.createObjectURL(formik.values.profile)
										: avatar
								}
								alt="avatar"
								className="profileImg"
							/>
						</label>
						<input type="file" name="profile" id="profile" onChange={onUpload} />
					</div>

					<div className="inputs">
						<div className="input">
							<div className="icon">
								<img src={email} alt="" />
							</div>
							<input
								type="email"
								placeholder="email"
								className="textBox"
								{...formik.getFieldProps("email")}
							/>
						</div>
						<div className="input">
							<div className="icon">
								<img src={user} alt="" />
							</div>
							<input
								type="text"
								placeholder="Username"
								className="textBox"
								{...formik.getFieldProps("username")}
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
								{...formik.getFieldProps("password")}
							/>
						</div>

						<ReCAPTCHA
							sitekey="6LcBOgkqAAAAAAm9dE9FX7f4ehI1PA_YK4-eTHQH"
							onChange={(token) => {
								setToken(token);
							}}
						/>
					</div>

					<div className="buttons">
						<button className="btn submit" type="submit">
							Register
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
					<span>
						Alredy registerd?{" "}
						<Link className="link" to="/login">
							Login now
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

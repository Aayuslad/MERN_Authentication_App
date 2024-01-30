import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerFormValidation } from "../helper/validate";
import avatar from "../../public/images/profile.png";
import usersStore from "../stores/usersStore";
import convertToBase64 from "../helper/convert";

export default function RegisterForm() {
	const [file, setFile] = useState();
	const navigate = useNavigate();
	const store = usersStore();

	const fromik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
		},
		validate: registerFormValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			values = Object.assign(values, { profile: file || "" });
			store.register(values, navigate);
		},
	});

	// Function to handle image uplod logic
	const onUpload = async (e) => {
		const base64 = await convertToBase64(e.target.files[0]);
		setFile(base64);
	};

	return (
		<div className="RegistrationPage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Register</h2>
					<p>Happy to join you</p>
				</div>

				<form className="form_body" onSubmit={fromik.handleSubmit}>
					<div className="profile">
						<label htmlFor="profile">
							<img src={file || avatar} alt="avatar" className="profileImg" />
						</label>
						<input type="file" name="profile" id="profile" onChange={onUpload} />
					</div>

					<div className="inputs">
						<div className="input">
							<div className="icon">
								<img src="../../public/icons/email.svg" alt="" />
							</div>
							<input
								type="email"
								placeholder="email"
								className="textBox"
								{...fromik.getFieldProps("email")}
							/>
						</div>
						<div className="input">
							<div className="icon">
								<img src="../../public/icons/user.svg" alt="" />
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
								<img src="../../public/icons/password.svg" alt="" />
							</div>
							<input
								type="password"
								placeholder="password"
								className="textBox"
								{...fromik.getFieldProps("password")}
							/>
						</div>
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
								<img src="../../public/images/google_logo.png" alt="" />
							</div>
							<b>Coninue with Google</b>
						</button>
						<button className="btn continue-w-github" type="button">
							<div className="logo">
								<img src="../../public/images/github_logo.png" alt="" />
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

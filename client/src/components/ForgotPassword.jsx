import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { forgotPasswordValidation } from "../helper/validate";
import email from "../../public/icons/email.svg";
import usersStore from "../stores/usersStore";

export default function ForgotPassword() {
	const store = usersStore();
	const navigate = useNavigate();

	const fromik = useFormik({
		initialValues: {
			email: "",
		},
		validate: forgotPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.sendOTPEmail(values, navigate);
		},
	});

	return (
		<div className="ForgotPasswordPage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Reset your password</h2>
					<p>If the account exists, we'll email you OTP to reset the password.</p>
				</div>

				<form className="form_body" onSubmit={fromik.handleSubmit}>
					<div className="inputs">
						<div className="input">
							<div className="icon">
								<img src={email} alt="" />
							</div>
							<input
								type="text"
								placeholder="Email"
								className="textBox"
								{...fromik.getFieldProps("email")}
							/>
						</div>
					</div>

					<div className="buttons">
						<button className="btn submit" type="submit">
							Reset password
						</button>
					</div>
				</form>

				<div className="form_footer">
					<span>
						Return to{" "}
						<Link className="link" to="/login">
							Login
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

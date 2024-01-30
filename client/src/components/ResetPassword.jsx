import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { ResetPasswordValidation } from "../helper/validate";
import { useNavigate } from "react-router-dom";
import usersStore from "../stores/usersStore";

export default function ResetPassword() {
	const store = usersStore();
	const navigate = useNavigate();

	const fromik = useFormik({
		initialValues: {
			password: "",
			confirm_PWD: "",
		},
		validate: ResetPasswordValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.updatePassword(values, navigate);
		},
	});

	return (
		<div className="ResetPasswordPage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Reset password</h2>
					<p>Enter new password</p>
				</div>

				<form className="form_body" onSubmit={fromik.handleSubmit}>
					<div className="inputs">
						<div className="input">
							<div className="icon">
								<img src="../../public/icons/password.svg" alt="" />
							</div>
							<input
								type="password"
								placeholder="New Password"
								className="textBox"
								{...fromik.getFieldProps("password")}
							/>
						</div>
						<div className="input">
							<div className="icon">
								<img src="../../public/icons/password.svg" alt="" />
							</div>
							<input
								type="text"
								placeholder="Confirm Password"
								className="textBox"
								{...fromik.getFieldProps("confirm_PWD")}
							/>
						</div>
					</div>

					<div className="buttons">
						<button className="btn submit" type="submit">
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

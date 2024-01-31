import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyOTPValidation } from "../helper/validate.js";
import { useEffect, useRef } from "react";
import usersStore from "../stores/usersStore.js";

export default function VerifyOTP() {
	const store = usersStore();
	const navigate = useNavigate();
	const inputRef = useRef([]);

	const formik = useFormik({
		initialValues: {
			OTP: new Array(6).fill(""),
		},
		validate: verifyOTPValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: (values) => {
			store.verifyOTP(values, navigate);
		},
	});

	useEffect(() => {
		// focus first field if it is empty
		if (!inputRef.current[0].value) inputRef.current[0].focus();
	});

	function handleChange(e, index) {
		// if it is number or space -> do not move
		if (isNaN(e.target.value) || e.target.value === " ") return;
		// adding values in formik
		formik.values.OTP[index] = e.target.value;
		// shifting focus on typing
		if (e.target.value && index < 5) inputRef.current[index + 1].focus();
	}

	// function to handle backspace
	function handleKeyDown(e, index) {
		if (e.key === "Backspace" && !e.target.value) {
			inputRef.current[index - 1].focus();
		}
	}

	return (
		<div className="VerifyOTPPage">
			<Toaster></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>OTP Verification</h2>
					<p>One Time Password (OTP) has been sent via Email to {store.verificationEmail}.</p>
				</div>

				<form className="form_body" onSubmit={formik.handleSubmit}>
					<div className="inputs">
						<div className="input">
							{formik.values.OTP.map((box, index) => {
								return (
									<input
										key={index}
										type="test"
										maxLength={1}
										onChange={(e) => handleChange(e, index)}
										ref={(input) => (inputRef.current[index] = input)}
										onKeyDown={(e) => handleKeyDown(e, index)}
									/>
								);
							})}
						</div>
					</div>

					<p style={color: ""}>If not found, please check spam folder.</p>

					<div className="butons">
						<button className="btn" type="submit">
							Recover
						</button>
					</div>
				</form>

				<div className="form_footer">
					<span>
						Can't get OTP ?{" "}
						<button className="link" onClick={() => store.sendOTPEmail({}, navigate)}>
							Resend
						</button>
					</span>
				</div>
			</div>
		</div>
	);
}

import toast from "react-hot-toast";

// validating registeration form
export async function registerFormValidation(values) {
	const error = emailVerify({}, values);
	if (error.email) return error;
	usernameVerify(error, values);
	if (error.username) return error;
	passwordVerify(error, values);

	return error;
}

// validating login form
export async function loginFormValidation(values) {
	const error = usernameVerify({}, values);
	if (error.username) return error;
	passwordVerify(error, values);

	return error;
}

// validationg profile page
export async function profileUpdateValidation(values) {
	const error = emailVerify({}, values);
	return error;
}

// validating forgot password page
export async function forgotPasswordValidation(values) {
	const error = emailVerify({}, values);
	return error;
}

// validating otp verification page
export async function verifyOTPValidation(values) {
	const error = otpVerify({}, values);
	return error;
}

// validating confirm password page
export async function ResetPasswordValidation(values) {
	const error = passwordVerify({}, values);
	if (error.password) return error;
	resetPasswordVerify(error, values);

	return error;
}

// All the functions (Logic) starts from here

// validating verify otp page
function resetPasswordVerify(error = {}, values) {
	if (values.password != values.confirm_PWD) {
		error.exist = toast.error("Password not match");
	}

	return error;
}

// validate email
function emailVerify(error = {}, values) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!values.email) {
		error.email = toast.error("Email required");
	} else if (values.email.includes(" ")) {
		error.email = toast.error("Invalid email address");
	} else if (!emailRegex.test(values.email)) {
		error.email = toast.error("Invalid email address");
	}

	return error;
}

// validate password
function passwordVerify(error = {}, values) {
	const specialCharactorsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

	if (!values.password) {
		error.password = toast.error("Password required");
	} else if (values.password.includes(" ")) {
		error.password = toast.error("Invalid password");
	} else if (values.password.length < 6) {
		error.password = toast.error("Minimum 6 digits required");
	} else if (!specialCharactorsRegex.test(values.password)) {
		error.password = toast.error("Password must have special charactors");
	}

	return error;
}

// validate username
function usernameVerify(error = {}, values) {
	if (!values.username) {
		error.username = toast.error("Username required");
	} else if (values.username.includes(" ")) {
		error.username = toast.error("Invalid username");
	}

	return error;
}

// validate OTP
function otpVerify(error = {}, values) {
	values.OTP.some((digit) => {
		if (!digit || isNaN(digit)) {
			error.OTP = toast.error("6 digit OTP required");
			return true;
		}
	});

	return error;
}

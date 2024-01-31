import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const usersStore = create((set) => ({
	verificationEmail: "",
	isLoading: false,

	register: async (values, navigate) => {
		try {
			await toast.promise(axios.post("/user/register", values), {
				pending: "Processing, please wait...",
				success: "Successfully registered",
			});
			navigate("/login");
		} catch (error) {
			if (error.response) {
				if (error.response.status === 413) {
					return toast.error("The document is too large");
				}
				toast.error(error.response.data.error);
			}
			toast.error("Error while registration");
		}
	},

	login: async (values, navigate) => {
		try {
			await toast.promise(axios.post("/user/login", values), {
				pending: "Processing, please wait...",
				success: "successfully Logged in",
			});
			navigate("/");
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.data.error);
			}
			toast.error("Error while login");
		}
	},

	logout: async (navigate) => {
		try {
			await toast.promise(axios.get("/user/logout"), {
				pending: "Processing, please wait...",
				success: "Successfully logged out",
			});
			navigate("/login");
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.error);
			}
			toast("Error while logut");
		}
	},

	getUserDetails: async (navigate) => {
		try {
			set({ isLoading: true });
			const res = await axios.get("/user/profile");
			set({ isLoading: false });
			return res.data;
		} catch (error) {
			set({ isLoading: false });
			if (error.response) {
				navigate("/login");
				return toast.warning(error.response.data.message);
			}
			toast.error("Error while getting user data");
		}
	},

	updateUserDetails: async (values) => {
		try {
			await toast.promise(axios.put("/user/updateUser", values), {
				pending: "Updating user data...",
				success: "User updated successfully",
			});
		} catch (error) {
			if (error.response) {
				if (error.response.status === 413) {
					return toast.error("Document is too large");
				}
				return toast.error(error.response.error);
			}
			toast.error("Error while updating data");
		}
	},

	sendOTPEmail: async (values, navigate) => {
		try {
			await toast.promise(axios.post("/user/generateOtp", values), {
				pending: "Sending email...",
				success: "Email sent",
			});
			set({ verificationEmail: values.email });
			navigate("/verifyotppage");
		} catch (error) {
			if (error.response) {
				return toast.error(error.response.data.error);
			}
			toast.error("Error while sending email");
		}
	},

	verifyOTP: async (values, navigate) => {
		const OTP = values.OTP.reduce((otp, digit) => otp + digit, "");

		try {
			await toast.promise(axios.get(`/user/verifyOtp?code=${OTP}`), {
				pending: "Processing, please wait...",
				success: "OTP verification successful",
			});
			navigate("/resetpassword");
		} catch (error) {
			if (error.response) return toast.error(error.response.data.error);
			toast.error("Faild to verify OTP");
		}
	},

	updatePassword: async (values, navigate) => {
		try {
			await toast.promise(axios.put("/user/resetPassword", values), {
				pending: "Processing, please wait...",
				success: "Password updated",
			});
			navigate("/login");
		} catch (error) {
			if (error.response) return toast.error(error.response.data.error);
			toast.error("Failed to update password");
		}
	},
}));

export default usersStore;

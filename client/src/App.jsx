import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import UserProfilePage from "./pages/UserProfilePage.jsx"
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"
import VerifyOTPPage from "./pages/VerifyOTPPage.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />}></Route>
					<Route path="/register" element={<RegisterPage />}></Route>
					<Route path="/" element={<UserProfilePage />}></Route>
					<Route path="/forgotpassword" element={<ForgotPasswordPage />}></Route>
					<Route path="/verifyotppage" element={<VerifyOTPPage />}></Route>
					<Route path="/resetpassword" element={<ResetPasswordPage />}></Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={true} theme="dark"/>
		</>
	);
}

export default App

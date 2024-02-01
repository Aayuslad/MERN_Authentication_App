import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileUpdateValidation } from "../helper/validate";
import avatar from "../../public/images/profile.png";
import user from "../../public/icons/user.svg"
import email from "../../public/icons/email.svg"
import address from "../../public/icons/address.svg"
import phone from "../../public/icons/phone.svg"
import usersStore from "../stores/usersStore";
import convertToBase64 from "../helper/convert";
import LoadingPage from "../pages/LoadingPage";

export default function Profile() {
	const navigate = useNavigate();
	const store = usersStore();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			address: "",
			profile: "",
			mobile: undefined,
		},
		validate: profileUpdateValidation,
		validateOnBlur: false,
		validateOnChange: false,
		onSubmit: async (values) => {
			store.updateUserDetails(values);
		},
	});

	// Function to handle image uplod logic
	const onUpload = async (e) => {
		const base64 = await convertToBase64(e.target.files[0]);
		formik.setValues({ ...formik.values, profile: base64 });
	};

	useEffect(() => {
		async function data() {
			const data = await store.getUserDetails(navigate);
			formik.setValues(data);
		}
		data();
	}, []);

	if (store.isLoading === true) {
		return <LoadingPage />;
	}

	return (
		<div className="ProfilePage">
			<Toaster reverseOrder={false}></Toaster>
			<div className="glass">
				<div className="form_header">
					<h2>Profile</h2>
					<p>You can update the details</p>
				</div>

				<form className="form_body" onSubmit={formik.handleSubmit}>
					<div className="profile">
						<label htmlFor="profile">
							<img src={formik.values.profile || avatar} alt="avatar" className="profileImg" />
						</label>
						<input type="file" name="profile" id="profile" onChange={onUpload} />
					</div>

					<div className="inputs">
						<div className="row">
							<div className="input">
								<div className="icon">
									<img src={user} alt="" />
								</div>
								<input
									type="text"
									placeholder="First Name"
									className="textBox"
									{...formik.getFieldProps("firstName")}
								/>
							</div>
							<div className="input">
								<div className="icon">
									<img src={user} alt="" />
								</div>
								<input
									type="text"
									placeholder="Last Name"
									className="textBox"
									{...formik.getFieldProps("lastName")}
								/>
							</div>
						</div>

						<div className="row">
							<div className="input">
								<div className="icon">
									<img src={phone} alt="" />
								</div>
								<input
									type="text"
									placeholder="Contact Number"
									inputMode="numeric"
									className="textBox"
									{...formik.getFieldProps("mobile")}
								/>
							</div>
							<div className="input">
								<div className="icon">
									<img src={email} alt="" />
								</div>
								<input
									type="text"
									placeholder="Email"
									className="textBox"
									{...formik.getFieldProps("email")}
								/>
							</div>
						</div>

						<div className="row">
							<div className="input long">
								<div className="icon">
									<img src={address} alt="" />
								</div>
								<input
									type="text"
									placeholder="Address"
									className="textBox w-max"
									{...formik.getFieldProps("address")}
								/>
							</div>
						</div>
					</div>

					<div className="buttons">
						<button className="btn submit" type="submit">
							Update
						</button>
					</div>
				</form>
				<div className="form_footer">
					<span>
						Come back later?{" "}
						<Link className="link" onClick={() => store.logout(navigate)}>
							Logout
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

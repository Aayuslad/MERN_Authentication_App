import { useState } from "react"
import { Link } from "react-router-dom"
import avatar from "../../public/images/profile.png"
import { Toaster } from "react-hot-toast"
import { useFormik } from "formik"
import { validateProfile } from "../helper/validate"
import convertToBase64 from "../helper/convert"

export default function Profile() {
    const [file, setFile] = useState()

    const fromik = useFormik({
        initialValues: {
            firstNme: "",
            lastName: "",
            email: "",
            address: "",
            mobile: "",
        },
        validate: validateProfile,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = Object.assign(values, { profile: file || "" })
            console.log(values)
        },
    })

    // function to handle image uplod logic
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    return (
        <div className="container mx-auto">
            <Toaster reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className="glass py-5">
                    <div className="flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Profile</h4>
                        <span className="py-4 textxl w-2/3 text-center text text-gray-500">
                            You can update the details
                        </span>
                    </div>

                    <form className="py-1" onSubmit={fromik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={file || avatar} alt="avatar" className="profileImg" />
                            </label>
                            <input type="file" name="profile" id="profile" onChange={onUpload} />
                        </div>

                        <div className="flex flex-col items-center px-10 gap-6">
                            <div className="name flex gap-5">
                                <input
                                    type="text"
                                    placeholder="firstName"
                                    className="textBox"
                                    {...fromik.getFieldProps("firstName")}
                                />
                                <input
                                    type="text"
                                    placeholder="lastName"
                                    className="textBox"
                                    {...fromik.getFieldProps("lastName")}
                                />
                            </div>
                            <div className="name flex gap-5">
                                <input
                                    type="text"
                                    placeholder="mobileNum"
                                    className="textBox"
                                    {...fromik.getFieldProps("mobileNum")}
                                />
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="textBox"
                                    {...fromik.getFieldProps("email")}
                                />
                            </div>
                            <div className="name flex flex-col items-center gap-10">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="textBox w-max"
                                    style={{"width":"443px"}}
                                    {...fromik.getFieldProps("address")}
                                />
                                <button className="btn" type="submit" style={{"width":"400px",}}>
                                    Update
                                </button>
                            </div>
                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-600">
                                Come back later? {" "}
                                <Link className="text-red-500" to="#">
                                    Logout
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

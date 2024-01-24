import { useState } from "react"
import { Link } from "react-router-dom"
import avatar from "../../public/images/profile.png"
import { Toaster } from "react-hot-toast"
import { useFormik } from "formik"
import { registerValidation } from "../helper/validate"
import convertToBase64 from "../helper/convert"

export default function Register() {
    const [file, setFile] = useState()

    const fromik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = Object.assign(values, { profile: file || "" })
            console.log(values);
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
                        <h4 className="text-5xl font-bold">Register</h4>
                        <span className="py-4 textxl w-2/3 text-center text text-gray-500">
                            Happy to join you
                        </span>
                    </div>

                    <form className="py-1" onSubmit={fromik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={file || avatar} alt="avatar" className="profileImg" />
                            </label>
                            <input type="file" name="profile" id="profile" onChange={onUpload}/>
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                type="email"
                                placeholder="email"
                                className="textBox"
                                {...fromik.getFieldProps("email")}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="textBox"
                                {...fromik.getFieldProps("username")}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                className="textBox"
                                {...fromik.getFieldProps("password")}
                            />
                            <button className="btn" type="submit">
                                Register
                            </button>
                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-600">
                                Alredy registerd?{" "}
                                <Link className="text-red-500" to="/">
                                    Login now
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

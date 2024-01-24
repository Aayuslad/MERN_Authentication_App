import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useFormik } from "formik"
import { usernameValidate } from "../helper/validate"
import avatar from "../../public/images/profile.png"

export default function Username() {
    const fromik = useFormik({
        initialValues: {
            username: "",
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values)
        },
    })

    return (
        <div className="container mx-auto">
            <Toaster reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className="glass py-16">
                    <div className="flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Hello Again!</h4>
                        <span className="py-4 textxl w-2/3 text-center text text-gray-500">
                            Explore more by connecting with us !
                        </span>
                    </div>

                    <form className="py-1" onSubmit={fromik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img src={avatar} alt="avatar" className="profileImg" />
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                type="text"
                                placeholder="Username"
                                className="textBox"
                                {...fromik.getFieldProps("username")}
                            />
                            <button className="btn" type="submit">
                                Let's Go
                            </button>
                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-600">
                                Not a member{" "}
                                <Link className="text-red-500" to="/register">
                                    Ragister
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

import { Toaster } from "react-hot-toast"
import { useFormik } from "formik"
import { resetPasswordValidate } from "../helper/validate"

export default function Password() {
    const fromik = useFormik({
        initialValues: {
            password: "",
            confirm_PWD: "",
        },
        validate: resetPasswordValidate,
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
                <div className="glass py-14">
                    <div className="flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Reset password</h4>
                        <span className="py-4 textxl w-2/3 text-center text text-gray-500">
                            Enter new password
                        </span>
                    </div>

                    <form className="py-1" onSubmit={fromik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input
                                type="text"
                                placeholder="password"
                                className="textBox"
                                {...fromik.getFieldProps("password")}
                            />
                            <input
                                type="text"
                                placeholder="confirm"
                                className="textBox mb-16"
                                {...fromik.getFieldProps("confirm_PWD")}
                            />
                            <button className="btn" type="submit">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

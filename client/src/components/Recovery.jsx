export default function Recovery() {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="glass py-16">
                    <div className="flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Recovery</h4>
                        <span className="py-4 textxl w-2/3 text-center text text-gray-500">
                            Enter otp to recover password
                        </span>
                    </div>

                    <form className="py-1"  >
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="input text-center">
                                <span className="py-4 text-sm text-left text-gray-500">
                                    Enter 6 digit OTP sent to your email address.
                                </span>
                                <input
                                    type="text"
                                    placeholder="OTP"
                                    className="textBox"
                                />
                            </div>

                            <button className="btn" type="submit">
                                Recover
                            </button>
                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-600">
                                Can't get OTP ?{" "}
                                <button className="text-red-500">
                                    Resend
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

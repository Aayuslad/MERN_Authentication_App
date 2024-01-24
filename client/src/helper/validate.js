import toast from "react-hot-toast"

export async function usernameValidate(values) {
    const error = usernameVerify({}, values)

    return error
}

export async function passwordValidate(values) {
    const error = passwordVerify({}, values)

    return error
}

export async function resetPasswordValidate(values) {
    const error = passwordVerify({}, values)
    confirmPassword(error, values)

    return error
}

// validate profile page 
export async function validateProfile(values) {
    const error = emailVerify({}, values)

    return error;
}

// validating register form
export async function registerValidation(values) {
    const error = emailVerify({}, values)
    passwordVerify(error, values)
    usernameVerify(error, values)

    return error
}

// validating reset password
function confirmPassword(error = {}, values) {
    if (values.password != values.confirm_PWD) {
        error.exist = toast.error("Password not match...!")
    }

    return error
}

// validate email
function emailVerify(error = {}, values) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!values.email) {
        error.email = toast.error("Email required...!")
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong email...!")
    } else if (!emailRegex.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error
}

// validate password
function passwordVerify(error = {}, values) {
    const specialCharactorsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

    if (!values.password) {
        error.password = toast.error("Password required...!")
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Invalid password...!")
    } else if (values.password.length < 6) {
        error.password = toast.error("minimum 6 digits required...!")
    } else if (!specialCharactorsRegex.test(values.password)) {
        error.password = toast.error("Password must have special charactors")
    }

    return error
}

// validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username required...!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid username...!")
    }

    return error
}

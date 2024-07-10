# MERN_Authentication_App

MERN_Authentication_App is a full-stack web application that provides authentication functionalities including user registration, login, profile management, and password reset via OTP verification to email. This project also includes Google reCAPTCHA to enhance security during the registration and login processes.

## Live Link - [[here](https://mern-authentication-app-frontend.vercel.app)](https://mern-authentication-app-frontend.vercel.app).

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Registration:** Allows new users to register an account with email verification.
- **User Login:** Users can log in to their accounts securely.
- **Profile Management:** Users can update their profile information.
- **Password Reset:** Users can reset their password using OTP verification sent to their email.
- **Google reCAPTCHA:** Implemented on registration and login pages to prevent bots.
- **Session Management:** Uses sessions to keep users logged in securely.

## Screenshots

| Register Page                      | Login Page                         | User Profile Page                  |
|------------------------------------|------------------------------------|------------------------------------|
| <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/08a9679f-634d-431d-a4f5-82aa6e2dcde0" alt="Register Page" width="150"> | <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/f991141f-7290-4bc8-b3d0-dd7494defe12" alt="Login Page" width="150"> | <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/70741aaf-77f0-4731-8c14-12761a053d96" alt="User Profile Page" width="150"> |
| Forgot Password Page               | Verify OTP Page                    | Reset Password Page                |
| <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/50c52230-dab3-48f9-8c4e-7d34f7d4f6ea" alt="Forgot Password Page" width="150"> | <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/7fec7719-2e86-4840-b941-3fc85008226d" alt="Verify OTP Page" width="150"> | <img src="https://github.com/Aayuslad/MERN_Authentication_App/assets/111479342/00fed077-e554-4ca3-b1e8-6119fcd79203" alt="Reset Password Page" width="150"> |

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/MERN_Authentication_App.git
    cd MERN_Authentication_App
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the `backend` directory and add the following:
    ```env
    RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
    CLOUD_NAME=your_cloudinary_cloud_name
    API_KEY=your_cloudinary_api_key
    API_SECRET=your_cloudinary_api_secret
    PORT=your_desired_port
    DB_URL=your_mongodb_url
    SECRET=your_jwt_secret
    EMAIL=your_email_address
    PASS=your_email_password
    SESSION_SECRET=your_session_secret
    ```

## Usage
1. Run the backend server:
    ```sh
    cd backend
    npm start
    ```

2. Run the frontend development server:
    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Description of the feature"
    ```
4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from "axios"
import { GoogleOAuthProvider } from "@react-oauth/google";
axios.defaults.baseURL = "https://mern-authentication-app-backend.vercel.app";
// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="<your_client_id>">
        <App />
    </GoogleOAuthProvider>
)

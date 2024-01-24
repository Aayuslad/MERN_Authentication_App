import { BrowserRouter, Routes, Route } from "react-router-dom"
import Username from "./components/Username.jsx"
import Reset from "./components/Reset.jsx"
import Register from "./components/Register.jsx"
import Recovery from "./components/Recovery.jsx"
import Profile from "./components/Profile.jsx"
import Password from "./components/Password.jsx"
// import PageNotFound from "./components/PageNotFound.jsx"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Username />}></Route>
                    <Route path="/password" element={<Password />}></Route>
                    <Route path="/recovery" element={<Recovery />}></Route>
                    <Route path="/reset" element={<Reset />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="*" element={"Page not found"}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import { useAuthContext } from "./hooks/useAuthContext"
//pages
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Home from "./pages/home/Home"
//components
import NavBar from "./components/NavBar"
import SideNavBar from "./components/SideNavBar"

function App() {
    const { authIsReady, user } = useAuthContext()
    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    <NavBar />
                    <div className="mainPage">
                        {user && <SideNavBar />}
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    user ? <Home /> : <Navigate to="/login" />
                                }
                            />

                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />

                            <Route
                                path="/signup"
                                element={
                                    !user ? <Signup /> : <Navigate to="/" />
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App

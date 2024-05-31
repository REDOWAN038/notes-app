import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Navbar from "./components/Navbar/Navbar"
import ProtectedRoute from "./Protection/ProtectedRoute"
import Empty from "./components/Empty/Empty"

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute accessBy='authorized'>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <SignIn />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <ProtectedRoute accessBy='unauthorized'>
                            <SignUp />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='*'
                    element={<Empty message={"404. no page found"} />}
                />
            </Routes>
        </Router>
    )
}

export default App

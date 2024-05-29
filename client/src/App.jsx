import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Navbar from "./components/Navbar/Navbar"
const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/dashboard' element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </Router>
    )
}

export default App

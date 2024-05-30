import { useNavigate } from "react-router-dom"
import { message } from "antd"
import Profile from "../Profile/Profile"
import Search from "../Search/Search"
import { useContext, useState } from "react"
import axios from "axios"
import AuthContext from "../../context/authContext"

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const { user, setLoggedUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/logout`,
                {},
                { withCredentials: true }
            )

            console.log("res ", response)

            if (response?.data?.success) {
                localStorage.removeItem("user")
                setLoggedUser(null)
                message.success(response?.data?.message)
                navigate("/signin")
            }
        } catch (error) {
            message.error("something went wrong. try again!!!")
        }
    }

    const handleSearch = () => {}

    const onClearSearch = () => {
        setSearchQuery("")
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
            <Search
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <div className='flex items-center gap-3'>
                {user ? <Profile handleLogout={handleLogout} /> : null}
            </div>
        </div>
    )
}

export default Navbar

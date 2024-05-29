import { useNavigate } from "react-router-dom"
import Profile from "../Profile/Profile"
import Search from "../Search/Search"
import { useState } from "react"

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/signin")
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
            <Profile handleLogout={handleLogout} />
        </div>
    )
}

export default Navbar

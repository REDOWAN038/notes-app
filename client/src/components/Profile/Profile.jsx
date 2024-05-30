import { useContext } from "react"
import AuthContext from "../../context/authContext"
import { getInitials } from "../../utils/helper"

const Profile = ({ handleLogout }) => {
    const { user } = useContext(AuthContext)
    const { name } = user.userWithOutPassword
    return (
        <>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials(name)}
            </div>

            <div>
                <p className='text-sm font-medium'>{name}</p>
                <button
                    className='text-sm text-slate-700 underline'
                    onClick={handleLogout}
                >
                    SignOut
                </button>
            </div>
        </>
    )
}

export default Profile

import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { message } from "antd"
import Password from "../../components/Input/Password"
import { useContext, useState } from "react"
import { validateEmail } from "../../utils/helper"
import AuthContext from "../../context/authContext"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const { setLoggedUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const removeError = () => {
        setTimeout(() => {
            setError("")
        }, 1000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            setError("please enter the credentials.")
            removeError()
            return
        }

        if (!validateEmail(email)) {
            setError("please enter a valid email address.")
            removeError()
            return
        }

        if (!password) {
            setError("please enter password.")
            removeError()
            return
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setLoggedUser(res?.data?.payload)
                localStorage.setItem("user", JSON.stringify(res?.data?.payload))

                message.success(res?.data?.message)
                navigate("/dashboard")
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                message.error(error?.response?.data?.message)
                navigate("/users/signup")
            } else if (error?.response?.status === 401) {
                message.error(error?.response?.data?.message)
            } else {
                message.error("check your network connection")
            }
        }
    }

    return (
        <>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='text-2xl mb-7'>SignIn</h4>
                        <input
                            type='text'
                            placeholder='Email'
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error ? (
                            <p className='text-red-500 text-xs pb-1'>{error}</p>
                        ) : null}

                        <button type='submit' className='btn-primary'>
                            SignIn
                        </button>
                        <p className='text-sm text-center mt-4'>
                            not registered yet?{" "}
                            <Link
                                to='/signup'
                                className='font-medium text-primary underline'
                            >
                                create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"
import Password from "../../components/Input/Password"
import axios from "axios"
import { message } from "antd"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const removeError = () => {
        setTimeout(() => {
            setError("")
        }, 1000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email && !name && !password) {
            setError("please enter the credentials.")
            removeError()
            return
        }

        if (!name) {
            setError("please enter name.")
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
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
                {
                    name,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                message.info(res?.data?.message)
                navigate("/signin")
            }
        } catch (error) {
            if (error?.response?.status === 409) {
                message.info(error?.response?.data?.message)
                navigate("/signin")
            } else if (error?.response?.status === 500) {
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
                        <h4 className='text-2xl mb-7'>SignUp</h4>
                        <input
                            type='text'
                            placeholder='Name'
                            className='input-box'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            SignUp
                        </button>
                        <p className='text-sm text-center mt-4'>
                            already have an account?{" "}
                            <Link
                                to='/signin'
                                className='font-medium text-primary underline'
                            >
                                sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp

import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import Password from "../../components/Input/Password"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            setError("please enter the credentials.")
            return
        }

        if (!validateEmail(email)) {
            setError("please enter a valid email address.")
            return
        }

        if (!password) {
            setError("please enter password.")
            return
        }

        setError("")
    }

    return (
        <>
            <Navbar />
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
                            Not Registered Yet?{" "}
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
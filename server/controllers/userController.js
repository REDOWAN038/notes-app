const { successResponse } = require("../handler/responseHandler")
const { userRegisterAction, userLogin } = require("../services/userService")

// register user
const registerUser = async (req, res, next) => {
    try {
        await userRegisterAction(req)
        return successResponse(res, {
            statusCode: 200,
            message: "registered successfully",
        })
    } catch (error) {
        next(error)
    }
}

// user login
const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { userWithOutPassword, accessToken } = await userLogin(email, password)
        res.cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 1000,  // expires in 60 minutes
            httpOnly: true,
            sameSite: 'none',
        })
        return successResponse(res, {
            statusCode: 200,
            message: `welcome back, ${userWithOutPassword.name}`,
            payload: {
                userWithOutPassword
            }
        })
    } catch (error) {
        next(error)
    }
}

// user logout
const handleLogout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken")
        return successResponse(res, {
            statusCode: 200,
            message: "logged out successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerUser,
    handleLogin,
    handleLogout
}
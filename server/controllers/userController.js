const { successResponse } = require("../handler/responseHandler")
const { userRegisterAction } = require("../services/userService")

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

module.exports = {
    registerUser
}
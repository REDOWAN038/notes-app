const createError = require("http-errors")
const bcrypt = require("bcryptjs")

const userModel = require("../models/userModel")
const { createJWT } = require("../handler/jwt")
const { jwtAccessKey } = require("../src/secret")



// register user
const userRegisterAction = async (req) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            throw createError(409, "user already exists by this mail or phone")
        }

        const newUser = { name, email, password }

        await userModel.create(newUser)

    } catch (error) {
        throw error
    }
}

// login user
const userLogin = async (email, password) => {
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            throw createError(404, "user with this email does not registered. please sign up")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw createError(401, "wrong password. try again!!!")
        }

        // creating access token and set up in cookies
        const accessToken = createJWT({ user }, jwtAccessKey, "1h")
        const userWithOutPassword = user.toObject()
        delete userWithOutPassword.password
        return { userWithOutPassword, accessToken }
    } catch (error) {
        throw error
    }
}

module.exports = {
    userRegisterAction,
    userLogin
}
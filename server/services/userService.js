const createError = require("http-errors")

const userModel = require("../models/userModel")


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

module.exports = {
    userRegisterAction
}
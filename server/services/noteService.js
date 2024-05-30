const createError = require("http-errors")

const noteModel = require("../models/noteModel")
const userModel = require("../models/userModel")

// add note
const addNote = async (title, content, tags, user) => {
    try {
        const isUser = await userModel.findById(user._id)
        if (!isUser) {
            throw createError(404, "user not available")
        }

        const newNote = { title, content, tags, createdBy: user._id }
        await noteModel.create(newNote)
        return newNote
    } catch (error) {
        throw error
    }
}

module.exports = {
    addNote
}
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
        const note = await noteModel.create(newNote)
        return note
    } catch (error) {
        throw error
    }
}

// edit note
const editNote = async (req) => {
    try {
        const { id } = req.params
        if (!req.body || Object.keys(req.body).length === 0) {
            throw createError(400, "nothing to update")
        }
        const note = await noteModel.findOne({
            _id: id,
            createdBy: req.user._id
        })

        if (!note) {
            throw createError(404, "note not available")
        }

        const updateOptions = { new: true, runValidators: true, context: 'query' }
        let updates = {}
        const allowedFields = ['title', 'content', 'tags', 'isPinned']

        for (let key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key]
            }
        }

        const updatedNote = await noteModel.findByIdAndUpdate(
            id,
            updates,
            updateOptions
        )

        if (!updatedNote) {
            throw error(400, "something went wrong")
        }

        return updatedNote
    } catch (error) {
        throw error
    }
}

// get all notes
const getAllNotes = async (userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user not found")
        }

        const notes = await noteModel.find({
            createdBy: userId
        }).sort({ isPinned: -1 })

        return notes
    } catch (error) {
        throw error
    }
}

module.exports = {
    addNote,
    editNote,
    getAllNotes
}
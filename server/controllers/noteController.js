const { successResponse } = require("../handler/responseHandler")
const { addNote, editNote, getAllNotes, deleteNote } = require("../services/noteService")

// add note
const handleAddNote = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body
        const newNote = await addNote(title, content, tags, req.user)
        return successResponse(res, {
            statusCode: 201,
            message: "note created successfully",
            payload: {
                newNote
            }
        })
    } catch (error) {
        next(error)
    }
}

// edit note
const handleEditNote = async (req, res, next) => {
    try {
        const updatedNote = await editNote(req)
        return successResponse(res, {
            statusCode: 200,
            message: "note updated successfully",
            payload: {
                updatedNote
            }
        })
    } catch (error) {
        next(error)
    }
}

// get all notes
const handleGetAllNotes = async (req, res, next) => {
    try {
        const notes = await getAllNotes(req.user._id)
        return successResponse(res, {
            statusCode: 200,
            message: "notes returned successfully",
            payload: {
                notes
            }
        })
    } catch (error) {
        next(error)
    }
}

// delete note
const handleDeleteNote = async (req, res, next) => {
    try {
        const { id } = req.params
        await deleteNote(id, req.user._id)
        return successResponse(res, {
            statusCode: 200,
            message: "note deleted successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleAddNote,
    handleEditNote,
    handleGetAllNotes,
    handleDeleteNote
}
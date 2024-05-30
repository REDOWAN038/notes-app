const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { validateNote } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleAddNote, handleEditNote, handleGetAllNotes, handleDeleteNote } = require("../controllers/noteController")
const router = express.Router()

// add note
router.post("/", isLoggedIn, validateNote, runValidation, handleAddNote)

// get all notes
router.get("/", isLoggedIn, handleGetAllNotes)

// edit note
router.put("/:id", isLoggedIn, handleEditNote)

// delete note
router.delete("/:id", isLoggedIn, handleDeleteNote)


module.exports = router
const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { validateNote } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleAddNote, handleEditNote } = require("../controllers/noteController")
const router = express.Router()

// add note
router.post("/", isLoggedIn, validateNote, runValidation, handleAddNote)

// edit note
router.put("/:id", isLoggedIn, handleEditNote)


module.exports = router
const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { validateNote } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleAddNote } = require("../controllers/noteController")
const router = express.Router()

// add note
router.post("/", isLoggedIn, validateNote, runValidation, handleAddNote)


module.exports = router
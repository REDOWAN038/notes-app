const express = require("express")
const { registerUser } = require("../controllers/userController")
const { validateUserRegistration } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth")
const router = express.Router()

// user registration
router.post("/register", isLoggedOut, validateUserRegistration, runValidation, registerUser)

module.exports = router
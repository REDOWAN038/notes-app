const express = require("express")
const { registerUser, handleLogin, handleLogout } = require("../controllers/userController")
const { validateUserRegistration, validateUserLogin } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth")
const router = express.Router()

// user registration
router.post("/register", isLoggedOut, validateUserRegistration, runValidation, registerUser)

// user logged in
router.post("/login", validateUserLogin, runValidation, isLoggedOut, handleLogin)

// user logged out
router.post("/logout", isLoggedIn, handleLogout)


module.exports = router
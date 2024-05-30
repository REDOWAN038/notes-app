const { body } = require("express-validator")

// validate user registration input
const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Pasword is required")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    // .withMessage("Password must be at least 8 characters, contain a lowercase letter, an uppercase letter, a number, and a special character"),
]

// validate user login input
const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()

        .withMessage("Pasword is required")
]
// validate note
const validateNote = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
]

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateNote
}
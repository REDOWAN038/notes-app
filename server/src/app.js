const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()

const userRoutes = require("../routes/userRoutes")

const { errorResponse } = require("../handler/responseHandler")



// middlewares
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

// routes
app.use("/api/v1/users", userRoutes)

app.get("/test", (req, res) => {
    res.status(200).json({
        message: "welcome to the server"
    })
})

// handling client error
app.use((req, res, next) => {
    createError(404, "route not found")
    next()
})

// handling server error
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app
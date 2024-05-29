require("dotenv").config()
const port = process.env.SERVER_PORT || 8001
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/MERN"
const jwtAccessKey = process.env.JWT_ACESS_KEY


module.exports = {
    port,
    mongoURL,
    jwtAccessKey
}
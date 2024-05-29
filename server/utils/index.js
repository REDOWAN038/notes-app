const jwt = require("jsonwebtoken")
const { jwtAccessKey } = require("../src/secret")

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "no token found"
        })
    }

    jwt.verify(token, jwtAccessKey, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "invalid token"
            })
        }

        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken
}
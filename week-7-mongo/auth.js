const jwt = require("jsonwebtoken")
const JWT_SECRET = "ray12345"

function auth(req, res, next) {
    const token = req.headers.token
    const decodedData = jwt.verify(token, JWT_SECRET)

    if(!decodedData) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    req.userId = decodedData.id
    next()
}

module.exports = {
    auth, 
    JWT_SECRET
}
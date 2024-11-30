require(dotenv).config()
const jwt = require("jsonwebtoken")

function userAuth(req, res, next) {
    const token = req.headers.token

    // Verify if the token is valid for the user
    jwt.verify(token, process.env.JWT_USER_PASSWORD, (err, data) => {

        if (err) {
            res.status(403).send({
                message: "Invalid User"
            })
        }

        //Set id on the HTTP header and call next on success
        req.userId = data.id
        next()
    })
}

module.exports = {
    userAuth
}
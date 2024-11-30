require(dotenv).config()
const jwt = require("jsonwebtoken")

function adminAuth(req, res, next) {
    const token = req.headers.token

    // Verify if the token is valid for the admin
    jwt.verify(token, process.env.JWT_ADMIN_PASSWORD, (err, data) => {

        if (err) {
            res.status(403).send({
                message: "Invalid Admin"
            })
        }

        //Set id on the HTTP header and call next on success
        req.adminId = data.id
        next()
    })
}

module.exports = {
    adminAuth
}
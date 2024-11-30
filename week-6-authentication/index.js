const express = require("express")
var jwt = require('jsonwebtoken')

const JWT_SECRET = "sohamray1990"

const app = express() // Create an instance

app.use(express.json()) // Use express.json as a middleware to parse the post request body

const users = [];

function logger(req, res, next) {
    console.log("Request came from :", req.method)
    next()
}

/**
 * POST Route Handler : Sign-up
 * Step 1 - Get username, password from the HTTP request body, once user submits from UI
 * Step 2 - Store the user data in users arr (in memory variable)
 * Step 3 - Respond with a success message
 */
app.post("/sign-up", logger, (req, res) => {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username,
        password
    })

    res.send("You have signed up successfully!")
})

/**
 * POST Route Handler : Sign-in
 * Step 1 - Get username, password from the HTTP req body once user submits data
 * Step 2 - Check if it is an existing user
 * Step 3 - If No, display with a failure message
 * Step 4 - If Yes, generate JWT token for subsequent authenticated calls
 */
app.post("/sign-in", logger, (req, res) => {
    // Step 1
    const username = req.body.username
    const password = req.body.password

    // Step 2
    const user = users.find(user => username === user.username && password === user.password)
    console.log("user", user)

    // Step 3 
    if(!user) {
        res.json({
            message: "Incorrect credentials"
        })
        return
    }

    // Step 4 
    const token = jwt.sign({
        username: user.username
    }, JWT_SECRET)
    res.json({
        token
    })
    console.log("user", user)
})

/**
 * Auth Middleware - auth
 * Step 1 - Get the token from HTTP header
 * Step 2 - Verify if the token is a valid JWT token
 * Step 3 - If No, send failure message and end the request
 * Step 4 - If Yes, call the next function
 */
function auth(req, res, next) {
    // Step 1
    const token = req.headers.token // Token is provided in the HTTP header for authenticated calls, once Sign-in is successful

    if(!token) {
        console.log("No token found")
        res.status(401).send({
            message: "Unauthorized"
        })
    }
    
     // Step 2 
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        // Step 3
        if(err) {
            console.log("Unauthorized user")
            res.status(401).send({
                message: "Unauthorized"
            })
        }

        // Step 4
        console.log("decodedData", decodedData)
        req.username = decodedData.username // Set username in the HTTP request for route handlers to access
        next()
    })
}

/**
 * GET Route Handler : me
 * Step 1 - Get username from HTTP request
 * Step 2 - Find the user from the users array
 * Step 3 - Respond back with the relevant user data
 */
app.get("/me", logger, auth, (req, res) => {
    //Step 1
    const currentUser = req.username

    // Step 2
    const foundUser = users.find(user => user.username === currentUser)

    // Step 3
    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000)
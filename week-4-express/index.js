const express = require("express");

const app = express()

app.use(express.json())

// Route handlers
app.get("/", (req, res) => {
    const param = req.query.n || 0
    console.log(param)
    res.send("Hi there!" + param)
})

// Route handlers
app.post("/", (req, res) => {
    console.log("req.body : ", req)
    const isHealthy = req.body.isHealthy;
    res.json({
        msg: "Done!" + isHealthy
    })
})

app.listen(3000) // On which port the process (of the server) is listening to (indefinitely, until stopped)
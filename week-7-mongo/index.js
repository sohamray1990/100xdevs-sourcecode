const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {UserModel, TodoModel} = require("./db")
const {auth, JWT_SECRET} = require("./auth")

mongoose.connect("mongodb+srv://sohamray1990:6mNcuhE84WHfYaH8@cluster0.3rqt2.mongodb.net/todo-app-database")

const app = express()
app.use(express.json()) // Required for parsing HTTP body

app.post("/sign-up", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email,
        password,
        name
    })

    res.json({
        message: "You have signed up successfully!"
    })

})

app.post("/sign-in", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email,
        password
    })

    console.log("user: ", user)

    if(!user) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET)

    res.json({
        token
    })

})

app.post("/todo", auth, (req, res) => {
    const userId = req.userId
    const title = req.body.title
    const done = req.body.done

    console.log("userId in POST TODO:", userId)

    TodoModel.create({
        userId,
        title,
        done
    })

    res.json({
        message: "Todo created"
    })

})

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId

    console.log("userId in GET TODOS:", userId)

    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos
    })
})

app.listen(3000)


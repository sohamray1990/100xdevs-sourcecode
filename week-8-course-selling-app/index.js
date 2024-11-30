require(dotenv).config()
console.log(process.env)

const express = require("express")
const mongoose = require("mongoose")

const {adminRouter} = require("./routes/admin")
const {courseRouter} = require("./routes/course")
const {userRouter} = require("./routes/user")

const app = express()

app.use(express.json())

// Route Handlers
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/user", userRouter)

// Start backend only when the DB connection is established
async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
}

main()

(
    console.log("Here at the end")
)()
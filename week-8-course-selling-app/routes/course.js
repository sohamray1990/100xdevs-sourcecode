require(dotenv).config()
const { Router} = require("express")
const {userModel, courseModel, purchaseModel} = require("../db")
const {userAuth} = require("../middlewares/user")

const courseRouter = Router()

courseRouter.post("/purchase", userAuth, async (req, res) => {
    // Get userId from HTTP header
    const userId = req.userId
    const courseId = req.body.courseId

    // Create an entry in purchase collection for the userId
    const purchase = await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "Purchased the course",
        purchaseId: purchase._id
    })
})

courseRouter.get("/preview", async (req, res) => {
    // Get all courses unauthenticated (for any user to view)

    try {
        const courses = courseSchema.find({})

        res.json({
            courses
        })
    }
    catch (err) {
        res.json({
            message: "Error while fetching courses"
        })
    }
    
})

module.exports = {
    courseRouter
}
require(dotenv).config()
const jwt = require("jsonwebtoken")
const { Router} = require("express")
const {userModel, courseModel, purchaseModel} = require("../db")
const {userAuth} = require("../middlewares/user")

const userRouter = Router()

userRouter.post("/sign-up", async (req, res) => {
    // Get details from HTTP body
    const { email, password, firstName, lastName} = req.body // TODO: Zod validation, hash password

    // Set the user details on the DB
    try {
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        })

        res.json({
            message: "User signed up"
        })
    } catch (err) {
        res.json({
            message: "Error while inserting in DB"
        })
    }
})

userRouter.post("/sign-in", async (req, res) => {
    // Get details from HTTP body
    const { email, password} = req.body // TODO: Zod validation, hash password

    // Check for the user in DB
    try {
        const user = await userModel.findOne({
            email,
            password
        })

        // In case of no user._id
        if (!user._id) {
            res.json({
                message: "Incorrect credentials"
            })
        }

        // Create JWT token for the user and send it in response
        const token = jwt.sign({
            id: user._id 
        }, process.env.JWT_USER_PASSWORD)

        res.json({
            token
        })
    
    } catch(err) {
        res.json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/user/purchases", userAuth, async (req, res) => {
    // Get userId from HTTP header
    const userId = req.userId

    // Get all courses relevant for the userId
    const purchases = await purchaseModel.find({
        userId
    })

    let purchasedCourseIds = [];
    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    // Find course details for the purchases
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter
}
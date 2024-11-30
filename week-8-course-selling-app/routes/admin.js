require(dotenv).config()
const jwt = require("jsonwebtoken")
const { Router} = require("express")
const {adminModel, courseModel, purchaseModel} = require("../db")
const {adminAuth} = require("../middlewares/admin")

const adminRouter = Router()

adminRouter.post("/sign-up", async (req, res) => {
    // Get details from HTTP body
    const { email, password, firstName, lastName} = req.body // TODO: Zod validation, hash password

    // Set the user details on the DB
    try {
        await adminModel.create({
            email,
            password,
            firstName,
            lastName
        })

        res.json({
            message: "Admin signed up"
        })
    } catch (err) {
        res.json({
            message: "Error while inserting in DB"
        })
    }

})

adminRouter.post("/sign-in", async (req, res) => {
    // Get details from HTTP body
    const { email, password} = req.body // TODO: Zod validation, hash password

    // Check for the admin in DB
    try {
        const admin = await adminModel.findOne({
            email,
            password
        })

        // In case of no admin._id
        if (!admin._id) {
            res.json({
                message: "Incorrect credentials"
            })
        }

        // Create JWT token for the admin and send it in response
        const token = jwt.sign({
            id: admin._id 
        }, process.env.JWT_ADMIN_PASSWORD)

        res.json({
            token
        })
    
    } catch(err) {
        res.json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminAuth, async (req, res) => {
    // Get adminId from HTTP header
    const adminId = req.adminId 
    const { title, description, price, imageUrl } = req.body

    // Create courses for the admin in DB
    try {
        const course = await courseModel.create({
            title,
            description,
            price, 
            imageUrl,
            creatorId: adminId
        })

        res.json({
            message: "Course published",
            courseId: course._id
        })

    } catch (err) {
        res.status(403).json({
            message: "Error while publising course"
        })
    }               
    
})

adminRouter.put("/course", adminAuth, async (req, res) => {
    // Get adminId from HTTP header
    const adminId = req.adminId 
    const { title, description, price, imageUrl, courseId } = req.body

    // Create courses for the admin in DB
    try {
        const course = await courseModel.create({
            _id: courseId,
            creatorId: adminId
        }, {
            title,
            description,
            price, 
            imageUrl
        })

        res.json({
            message: "Course updated",
            courseId: course._id
        })

    } catch (err) {
        res.status(403).json({
            message: "Error while publising course"
        })
    }  
})

adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
    // Get adminId from HTTP header
    const adminId = req.adminId 

    // Create courses for the admin in DB
    try {
        const courses = await courseModel.findAll({
            creatorId: adminId
        })

        res.json({
            courses
        })

    } catch (err) {
        res.status(403).json({
            message: "Error while getting your courses"
        })
    }  
})

module.exports = {
    adminRouter
}
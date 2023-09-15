const express = require("express")
const { signUpUser, signInUser } = require("../controllers/authController")

// Router
const router = express.Router()

// Post Methods
router.post("/signup", signUpUser) // Signup a user
router.post("/signin", signInUser) // Signin a user

module.exports = router

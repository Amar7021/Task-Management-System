const express = require("express")
const { signUpUser, signInUser } = require("../controllers/authController")

// Router
const router = express.Router()

// Signup a user
router.post("/signup", signUpUser)

// Signin a user
router.post("/signin", signInUser)

module.exports = router

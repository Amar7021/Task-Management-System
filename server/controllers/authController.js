const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// SignUp a user
const signUpUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // validator
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields must be filled" })
    }

    // check if username already exists
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res
        .status(401)
        .json({ error: "Email or Username already exists!" })
    }

    // check if email already exists
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res
        .status(401)
        .json({ error: "Email or Username already exists!" })
    }

    // hash the password before saving to database
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create a user
    const user = new User({ username, email, password: hashedPassword })
    await user.save()

    // generate a token
    const data = {
      user: {
        id: user.id,
      },
    }
    const authToken = jwt.sign(data, process.env.SECRET_KEY)
    res.status(200).json(authToken)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// SignIn a user
const signInUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // validator
    if (!email || !password) {
      res.status(400).json({ error: "All fields must be filled" })
    }

    // check if email already exists
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(401)
        .json({ error: "Please try to login with correct credentials!" })
    }

    // compare the password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ error: "Please try to login with correct credentials!" })
    }

    // generate a token
    const data = {
      user: {
        id: user.id,
      },
    }
    const authToken = jwt.sign(data, process.env.SECRET_KEY)
    res.status(200).json(authToken)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = { signUpUser, signInUser }

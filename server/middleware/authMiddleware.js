const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token")
  if (!token) {
    res.status(401).json("Enter a valid token")
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.user = data.user
    next()
  } catch (error) {
    res.status(401).json("Enter a valid token")
  }
}

module.exports = authMiddleware

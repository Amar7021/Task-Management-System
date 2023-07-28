const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const dotenv = require("dotenv")
dotenv.config()

// Express app
const app = express()

const PORT = process.env.PORT || 5000
const DB_URI = process.env.MONGO_URI

// Middlewares
app.use(cors())
app.use(express.json())

// Connect to Database
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to Database!")
  })
  .catch((error) => {
    console.log(error)
  })

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/task", taskRoutes)

// Listening to server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

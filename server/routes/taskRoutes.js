const express = require("express")
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// Create a new task
router.post("/addtask", authMiddleware, createTask)

// Retrieve all tasks for a specific user
router.get("/getalltasks", authMiddleware, getAllTasks)

// Retrieve a specific task by its ID
router.get("/getsingletask/:id", authMiddleware, getTaskById)

// Update a task
router.put("/updatetask/:id", authMiddleware, updateTask)

// Delete a task
router.delete("/deletetask/:id", authMiddleware, deleteTask)

module.exports = router

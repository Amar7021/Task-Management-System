const express = require("express")
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController")
const authMiddleware = require("../middleware/authMiddleware")

// Router
const router = express.Router()

// Post Methods
router.post("/addtask", authMiddleware, createTask) // Create a new task

// Get Methods
router.get("/getalltasks", authMiddleware, getAllTasks) // Retrieve all tasks for a specific user
router.get("/getsingletask/:id", authMiddleware, getTaskById) // Retrieve a specific task by its ID

// Put Methods
router.put("/updatetask/:id", authMiddleware, updateTask) // Update a task

// Delete Methods
router.delete("/deletetask/:id", authMiddleware, deleteTask) // Delete a task

module.exports = router

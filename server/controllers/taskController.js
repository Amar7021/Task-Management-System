const Task = require("../models/taskModel")

// Controller for creating a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body
    const userId = req.user.id

    const newTask = new Task({
      user: userId,
      title,
      description,
      dueDate,
      status,
    })

    await newTask.save()

    res.status(200).json(newTask)
  } catch (err) {
    res.status(500).json({ error: "Failed to create a new task" })
  }
}

// Controller for retrieving all tasks for a specific user
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id

    const tasks = await Task.find({ user: userId })

    res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
}

// Controller for retrieving a specific task by its ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findById({ _id: id })

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(200).json(task)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the task" })
  }
}

// Controller for updating a task by its ID
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { title, description, dueDate, status } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        dueDate,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(200).json(updatedTask)
  } catch (err) {
    res.status(500).json({ error: "Failed to update the task" })
  }
}

// Controller for deleting a task by its ID
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id

    const deletedTask = await Task.findByIdAndDelete(taskId)

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the task" })
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
}

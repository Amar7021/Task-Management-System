import React, { useEffect, useState } from "react"
import TaskItem from "../taskItem/TaskItem"
import TaskInput from "../taskInput/TaskInput"
import axios from "../../services/helper"
import { toast } from "react-toastify"
import "./task.scss"

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const res = await axios.get("/task/getalltasks", {
          headers: { "auth-token": localStorage.getItem("token") },
        })
        setTasks(res.data)
        setLoading(false)
      } catch (error) {
        console.log("Error", error)
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  // Handle task deletion
  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`/task/deletetask/${taskId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      setTasks((prevData) => prevData.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully", {
        position: "top-center",
        autoClose: 2500,
      })
    } catch (error) {
      console.log(error)
      toast.error("Error deleting task. Please try again later.", {
        position: "top-center",
        autoClose: 2500,
      })
    }
  }

  return (
    <div className="tasks">
      <div className="container">
        <TaskInput setTasks={setTasks} />
        <div className="task-wrapper">
          <h2>All Tasks</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : tasks.length === 0 ? (
            <>
              <p className="display-task">No tasks to display!</p>
              <p className="display-task">Add something to your task list.</p>
            </>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onDelete={() => handleTaskDelete(task._id)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Task

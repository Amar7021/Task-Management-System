import TodaysDate from "../date/Date"
import { Send, Close } from "@mui/icons-material"
import { useState } from "react"
import axios from "../../services/helper"
import { toast } from "react-toastify"
import "./taskInput.scss"

const initialData = {
  title: "",
  description: "",
  status: "Not Started",
  dueDate: "",
}

const TaskInput = ({ setTasks }) => {
  const [formData, setFormData] = useState(initialData)
  const [show, setShow] = useState(false)

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/task/addtask", formData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      setTasks((prevData) => [...prevData, res.data])
      setFormData(initialData)
      toast.success("Added a task successfully", {
        position: "top-center",
        autoClose: 2500,
      })
    } catch (error) {
      console.log(error)
      toast.error("Error adding task. Please try again later.", {
        position: "top-center",
        autoClose: 2500,
      })
    }
  }

  return (
    <div className="input-wrapper">
      <div className="add-button">
        <p>Add task</p>
        <button
          title="Add task"
          onClick={() => setShow(!show)}
        >
          +
        </button>
      </div>
      <TodaysDate />
      {!show && (
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              className="form-input"
              type="text"
              required
              placeholder="Title"
              minLength={5}
              maxLength={12}
              value={formData.title}
              onChange={handleChange}
            />
            <Close
              title="Close (Escape)"
              className="close-icon"
              onClick={() => setShow(!show)}
            />
            <input
              name="description"
              className="form-input"
              type="text"
              required
              placeholder="Description"
              minLength={5}
              maxLength={60}
              value={formData.description}
              onChange={handleChange}
            />
            <div className="select-wrapper">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="date-wrapper">
              <label htmlFor="dueDate">Due Date:</label>
              <input
                name="dueDate"
                className="date-input"
                type="date"
                id="dueDate"
                min={new Date().toISOString().split("T")[0]}
                required
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            <button type="submit">
              <Send className="send-icon" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default TaskInput

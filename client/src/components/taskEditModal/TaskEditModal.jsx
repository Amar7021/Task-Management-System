import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../../services/helper"
import { toast } from "react-toastify"
import "./taskEditModal.scss"

const initialData = {
  title: "",
  description: "",
  status: "Not Started",
  dueDate: "",
}

const TaskEditModal = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialData)
  const { id } = useParams()

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const res = await axios.get(`/task/getsingletask/${id}`, {
          headers: { "auth-token": localStorage.getItem("token") },
        })
        setFormData({
          ...res.data,
          dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "",
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleTask()
  }, [id])

  // Handle Form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formattedDueDate = new Date(formData.dueDate)
      .toISOString()
      .split("T")[0]
    setFormData((prevData) => ({ ...prevData, dueDate: formattedDueDate }))
    try {
      await axios.put(`/task/updatetask/${id}`, formData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      toast.success("Task updated successfully", {
        position: "top-center",
        autoClose: 2500,
      })
      navigate("/tasks")
    } catch (error) {
      console.log(error)
      toast.error("Error updating task. Please try again later.", {
        position: "top-center",
        autoClose: 2500,
      })
    }
  }

  return (
    <div className="taskEditModal">
      <div
        className="modal-conatiner"
        onClick={() => navigate("/tasks")}
      ></div>
      <div className="edit-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Title"
            minLength={5}
            maxLength={12}
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Description"
            minLength={5}
            maxLength={60}
            required
            name="description"
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
              type="date"
              id="dueDate"
              className="date-input"
              min={new Date().toISOString().split("T")[0]}
              required
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="Btn">
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskEditModal

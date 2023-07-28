import React, { useContext } from "react"
import TodaysDate from "../date/Date"
import { TaskContext } from "../../context/taskContext/TaskContext"
import { Send, Close } from "@mui/icons-material"
import "./taskInput.scss"

const TaskInput = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    selectedStatus,
    setSelectedStatus,
    selectedDueDate,
    setSelectedDueDate,
    show,
    setShow,
    addTask,
  } = useContext(TaskContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addTask({
        title,
        description,
        dueDate: selectedDueDate,
        status: selectedStatus,
      })

      setTitle("")
      setDescription("")
      setSelectedStatus("Not Started")
      setSelectedDueDate("")

      setShow(false)
    } catch (error) {
      console.log("Error adding a task:", error)
    }
  }
  const isSaveButtonDisabled = !(
    title.trim() &&
    description.trim() &&
    selectedDueDate
  )

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
              className="form-input"
              type="text"
              minLength={5}
              required
              placeholder="Title"
              maxLength={20}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Close
              title="Close (Escape)"
              className="close-icon"
              onClick={() => setShow(!show)}
            />
            <input
              className="form-input"
              type="text"
              minLength={5}
              required
              placeholder="Description"
              maxLength={60}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="select-wrapper">
              <label htmlFor="dueDate">Status:</label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
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
                className="date-input"
                type="date"
                id="dueDate"
                value={selectedDueDate}
                min={new Date().toISOString().split("T")[0]}
                required
                onChange={(e) => setSelectedDueDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isSaveButtonDisabled}
            >
              <Send className="send-icon" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default TaskInput

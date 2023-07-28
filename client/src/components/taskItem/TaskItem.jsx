import { Delete } from "@mui/icons-material"
import "./taskItem.scss"

const TaskItem = ({ task, onDelete }) => {
  const { _id, title, description, status, dueDate } = task
  const displayDate = new Date(dueDate)
  const formattedDueDate = displayDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  // Delete a task
  const handleDeleteClick = () => {
    onDelete(_id)
  }

  return (
    <tr className="task-item">
      <td className="task-title">{title}</td>
      <td className="task-desc">{description}</td>
      <td className="task-status">{status}</td>
      <td className="task-date">{formattedDueDate}</td>
      <td>
        <div>
          <button onClick={handleDeleteClick}>
            <Delete className="delete-icon" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TaskItem

import { Delete, Edit } from "@mui/icons-material"
import { Link } from "react-router-dom"
import "./taskItem.scss"

const TaskItem = ({ task, onDelete }) => {
  const { _id, title, description, status, dueDate } = task

  const displayDate = new Date(dueDate)
  const formattedDueDate = displayDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <tr className="task-item">
      <td className="task-title">{title}</td>
      <td className="task-desc">{description}</td>
      <td className="task-status">{status}</td>
      <td className="task-date">{formattedDueDate}</td>
      <td>
        <div className="task-icons">
          <Link to={`/update/${_id} `}>
            <Edit className="edit-icons" />
          </Link>
          <button onClick={() => onDelete(_id)}>
            <Delete className="icons" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TaskItem

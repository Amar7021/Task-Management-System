import { useContext } from "react"
import Footer from "../common/footer/Footer"
import Navbar from "../common/navbar/Navbar"
import { TaskContext } from "../../context/taskContext/TaskContext"
import TaskItem from "../taskItem/TaskItem"
import TaskInput from "../taskInput/TaskInput"
import "./task.scss"

const Task = () => {
  const { tasks, loading, error, selectedTask, deleteTask } =
    useContext(TaskContext)

  const handleDelete = async (taskId) => {
    await deleteTask(taskId)
  }

  // const handleUpdate = (task) => {
  //   setSelectedTask(task)
  //   setTitle(task.title)
  //   setDescription(task.description)
  //   setSelectedStatus(task.status)
  //   setSelectedDueDate(task.dueDate)
  //   setShow(true)
  // }

  // const handleUpdateTask = async (taskId) => {
  //   await updateTask(taskId, {
  //     title,
  //     description,
  //     dueDate: selectedDueDate,
  //     status: selectedStatus,
  //   })

  //   setSelectedTask(null)
  //   setTitle("")
  //   setDescription("")
  //   setSelectedStatus("Not Started")
  //   setSelectedDueDate("")
  //   setShow(false)
  // }

  // const handleUpdate = (task) => {
  //   setSelectedTask(task)
  // }

  return (
    <div className="tasks">
      <Navbar />
      <div className="container">
        <TaskInput />
        <div className="task-wrapper">
          <h2>All Tasks</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p>Error fetching tasks: {error}</p>
          ) : tasks.length === 0 ? (
            <>
              <p className="display-task">No tasks to display!</p>
              <p className="display-task">Add something in your task list.</p>
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
                    onDelete={handleDelete}
                    // onUpdate={handleUpdate}
                    isSelected={selectedTask?._id === task._id}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Task

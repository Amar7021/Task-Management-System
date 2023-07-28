import React, { createContext, useReducer, useEffect } from "react"
import axios from "../../api/axios"
import { toast } from "react-toastify"

export const TaskContext = createContext()

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  title: "",
  description: "",
  selectedStatus: "Not Started",
  selectedDueDate: "",
  show: false,
  selectedTask: null,
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload }
    case "SET_TITLE":
      return { ...state, title: action.payload }
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload }
    case "SET_SELECTED_STATUS":
      return { ...state, selectedStatus: action.payload }
    case "SET_SELECTED_DUE_DATE":
      return { ...state, selectedDueDate: action.payload }
    case "SET_SHOW":
      return { ...state, show: action.payload }
    case "SET_SELECTED_TASK":
      return { ...state, selectedTask: action.payload }
    case "FETCH_TASKS_REQUEST":
      return { ...state, loading: true, error: null }
    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, loading: false }
    case "FETCH_TASKS_FAILURE":
      return { ...state, loading: false, error: action.payload }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      }
    default:
      return state
  }
}

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    getTasks()
  }, [])

  // Fetch tasks
  const getTasks = async () => {
    dispatch({ type: "FETCH_TASKS_REQUEST" })
    try {
      const res = await axios.get("/task/getalltasks", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      dispatch({ type: "FETCH_TASKS_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "FETCH_TASKS_FAILURE", payload: error.message })
    }
  }

  // Add Task
  const addTask = async (newTask) => {
    try {
      const res = await axios.post("/task/addtask", newTask, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      dispatch({ type: "ADD_TASK", payload: res.data })
      toast.success("Added a task successfully", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      })
    } catch (error) {
      console.log("Error adding a task:", error)
    }
  }

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/task/deletetask/${taskId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      dispatch({ type: "DELETE_TASK", payload: taskId })
      toast.success("Task deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      })
    } catch (error) {
      console.log("Error deleting the task:", error)
    }
  }

  // Update Task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const res = await axios.put(`/task/updatetask/${taskId}`, updatedTask, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      dispatch({ type: "UPDATE_TASK", payload: res.data })
      toast.success("Task updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      })
    } catch (error) {
      console.log("Error updating the task:", error)
    }
  }

  const setShow = (show) => {
    dispatch({ type: "SET_SHOW", payload: show })
  }

  const setSelectedTask = (task) => {
    dispatch({ type: "SET_SELECTED_TASK", payload: task })
  }

  const setTitle = (title) => {
    dispatch({ type: "SET_TITLE", payload: title })
  }

  const setDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description })
  }

  const setSelectedStatus = (status) => {
    dispatch({ type: "SET_SELECTED_STATUS", payload: status })
  }

  const setSelectedDueDate = (dueDate) => {
    dispatch({ type: "SET_SELECTED_DUE_DATE", payload: dueDate })
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        setShow,
        setSelectedTask,
        setTitle,
        setDescription,
        setSelectedStatus,
        setSelectedDueDate,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

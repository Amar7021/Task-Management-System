import React from "react"
import ReactDOM from "react-dom/client"
import { AuthContextProvider } from "./context/authContext/AuthContext"
import App from "./App"
import { TaskContextProvider } from "./context/taskContext/TaskContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

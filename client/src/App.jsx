import Home from "./pages/home/Home"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/signIn/SignIn"
import NoMatch from "./pages/noMatch/NoMatch"
import Task from "./components/task/Task"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/authContext/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.scss"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Home /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/tasks" />}
          />
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to="/tasks" />}
          />
          {user && (
            <>
              <Route
                path="/tasks"
                element={<Task />}
              />
            </>
          )}
          <Route
            path="*"
            element={<NoMatch />}
          />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

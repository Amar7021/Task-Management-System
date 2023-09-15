import Home from "./pages/home/Home"
import SignUp from "./pages/signUp/SignUp"
import SignIn from "./pages/signIn/SignIn"
import NoMatch from "./pages/noMatch/NoMatch"
import Task from "./components/task/Task"
import Navbar from "./components/common/navbar/Navbar"
import Footer from "./components/common/footer/Footer"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/authContext/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.scss"
import TaskEditModal from "./components/taskEditModal/TaskEditModal"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
              <Route
                path="/update/:id"
                element={<TaskEditModal />}
              />
            </>
          )}
          <Route
            path="*"
            element={<NoMatch />}
          />
          <Route />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

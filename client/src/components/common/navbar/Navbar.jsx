import { Menu, Close } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../../context/authContext/AuthContext"
import { logoutUser } from "../../../context/authContext/apiCalls"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "./navbar.scss"

const Navbar = () => {
  const { dispatch } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleMenuToggle = () => {
    setShow((prevState) => !prevState)
  }

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [show])

  const handleLogout = () => {
    logoutUser(dispatch)
    toast.success("🦄 Logout Successfull!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    })
    navigate("/")
  }

  return (
    <header className="navbar">
      <nav>
        <Link
          to="/"
          className="links"
        >
          <h1 className="logo">TASKEEPER</h1>
        </Link>
        <ul className={`navlinks ${show ? "responsive-nav-links" : ""}`}>
          {user ? (
            <>
              <li>
                <span
                  className="links"
                  onClick={handleLogout}
                >
                  Sign out
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="links"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="links"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="links"
                >
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="mobileToggle">
          {!show ? (
            <Menu
              className="menu-icon"
              onClick={handleMenuToggle}
            />
          ) : (
            <Close
              className="menu-icon"
              onClick={handleMenuToggle}
            />
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar

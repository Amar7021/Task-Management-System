import { toast } from "react-toastify"
import axios from "../../services/helper"
import { loginFail, loginStart, loginSuccess, logout } from "./AuthActions"

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart())
  try {
    const res = await axios.post("/auth/signin", user)
    const token = res.data
    dispatch(loginSuccess(token))
    localStorage.setItem("token", token)
    toast.success("Login Successful!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    })
  } catch (err) {
    toast.error("Email or Password is wrong!", {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      theme: "colored",
    })
    dispatch(loginFail())
  }
}

export const logoutUser = (dispatch) => {
  dispatch(logout())
}

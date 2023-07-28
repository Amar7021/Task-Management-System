import { createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext()

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      }
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      }
    default:
      return { ...state }
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

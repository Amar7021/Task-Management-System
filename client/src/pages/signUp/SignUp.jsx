import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../services/helper"
import { useFormik } from "formik"
import { signUpSchema } from "../../schemas/authSchema"
import "./signUp.scss"

const SignUp = () => {
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { email, username, password } = values
    try {
      await axios.post("/auth/signup", {
        email,
        username,
        password,
      })
      toast.success("Registration Successfull!", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      })
      navigate("/signin")
    } catch (err) {
      toast.error("Email or Username is already in use!", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      })
      console.log(err)
    }
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  })

  return (
    <div className="signup">
      <div className="container">
        <div className="form-container">
          <h2 className="signup-header">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.username && touched.username ? "input-error" : ""
              }
            />
            <div className="usernameError">
              {errors.username && touched.username ? (
                <p className="error">{errors.username}</p>
              ) : null}
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <div className="emailError">
              {errors.email && touched.email ? (
                <p className="error">{errors.email}</p>
              ) : null}
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
            />
            <div className="passwordError">
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>
            <div className="btn">
              <button
                className="loginButton"
                type="submit"
                disabled={!isValid}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../api/axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import "./signUp.scss"

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters!")
    .max(16, "Username must be less than 16 characters!")
    .required("Username is required!"),
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be 8 to 20 characters!")
    .required("Password is required!"),
})

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
    validationSchema: validationSchema,
    onSubmit,
  })

  return (
    <div className="signup">
      <Navbar />
      <div className="container">
        <div className="form-container">
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default SignUp

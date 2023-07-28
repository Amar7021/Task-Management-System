import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { useFormik } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../context/authContext/AuthContext"
import { useContext } from "react"
import { loginUser } from "../../context/authContext/apiCalls"
import "./signIn.scss"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be 8 to 20 characters!")
    .required("Password is required!"),
})

const SignIn = () => {
  const { dispatch } = useContext(AuthContext)

  const onSubmit = (values) => {
    const { email, password } = values
    loginUser({ email, password }, dispatch)
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
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  })

  return (
    <div className="signIn">
      <Navbar />
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            <div className="errors">
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
            <div className="errors">
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
                Sign in
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

export default SignIn

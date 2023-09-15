import { useFormik } from "formik"
import { signInSchema } from "../../schemas/authSchema"
import { AuthContext } from "../../context/authContext/AuthContext"
import { useContext } from "react"
import { loginUser } from "../../context/authContext/apiCalls"
import "./signIn.scss"

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
    validationSchema: signInSchema,
    onSubmit,
  })

  return (
    <div className="signIn">
      <div className="container">
        <div className="form-container">
          <h2 className="signin-header">Sign in</h2>
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
    </div>
  )
}

export default SignIn

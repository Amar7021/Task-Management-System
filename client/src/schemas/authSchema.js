import * as Yup from "yup"

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
})

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  username: Yup.string()
    .min(3, "Name must be at least 3 characters!")
    .max(16, "Name must be less than 16 characters!")
    .required("Name is required!"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters!")
    .max(20, "Password must be less than 20 characters!")
    .required("Password is required!"),
})

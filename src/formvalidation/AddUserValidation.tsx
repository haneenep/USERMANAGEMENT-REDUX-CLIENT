import * as Yup from "yup";

export const AddUserValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Name must be in letters and spaces"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9]{4,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
      "Invalid email format, please use abcd@gmail.com format"
    )
    .matches(/^\S*$/, "Email should not contain any spaces"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^\S*$/, "Password should not contain any spaces"),
  cpassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must be match"),
});


import * as Yup from "yup";

export const ProfileValidation = Yup.object({
  name: Yup.string()
    .max(50, "Name must be 50 characters or less")
    .required("Name is required"),
  bio: Yup.string().max(20, "Bio must be 20 characters or less"),
});

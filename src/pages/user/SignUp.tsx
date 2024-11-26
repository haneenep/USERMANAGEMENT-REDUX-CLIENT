import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/features/userSlice";
import { SignUpValidation } from "../../formvalidation/signupValidation";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Button from "../../components/ButtonSign";

interface UserType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue: UserType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (userData: UserType) => {
    try {
      const response = await axios.post("/postsignup", userData);
      if (response.data.success) {
        toast.success(response.data.success)
        const fetchUser = await axios.get("/fetchuser", response);
        dispatch(setUserData(fetchUser.data));
        navigate("/home");
      } else if(response.data.error){
        toast.error(response.data.error)
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-900 to-emerald-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-100 mb-2 font-serif tracking-tight">
            USER MANAGEMENT
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto rounded-full" />
        </div>

        {/* Form Card */}
        <div className="backdrop-blur-sm bg-emerald-800/30 p-8 rounded-2xl shadow-2xl border border-emerald-700/50">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-100">
              Create Account
            </h2>
          </div>

          <Formik
            initialValues={initialValue}
            validationSchema={SignUpValidation}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <InputField name="name" type="text" label="Name" />
              <InputField name="email" type="email" label="Email" />
              <InputField name="password" type="password" label="Password" />
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
              />
              <Button text="Create Account"/>
            </Form>
          </Formik>

          <div className="mt-8 text-center text-emerald-200">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200
                         border-b border-emerald-400 hover:border-emerald-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

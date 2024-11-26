import { useState } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserData } from "../redux/features/userSlice";
import { SignIngValidation } from "../formvalidation/signingValidation";
import InputField from "../components/InputField";
import Button from "../components/ButtonSign";
import  Alert  from "@mui/material/Alert";
import axios from "../axios/axios"


interface SignInType {
  email: string;
  password: string;
}

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState<string>('')
  const [errorOn,setErrorOn] = useState<boolean>(false)

  const initialValue: SignInType = {
    email: "",
    password: "",
  };

  const handleSubmit = async (userData: SignInType) => {
    try {
      const response = await axios.post("/login", userData);
      if (response.data.success) {
        const fetchUser = await axios.get('/fetchuser', response);
        dispatch(setUserData(fetchUser.data));
        toast.success(response.data.success,{
          autoClose : 2000
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else if(response.data.error){
        // toast.error(response.data.error)
        setError(response.data.error)
        setErrorOn(true)
      }
      setTimeout(() => {
        setErrorOn(false)
        setError("")
      }, 3000);
    } catch (error) {
      
      console.error('Signin error:', error);
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
              Welcome Back
            </h2>
            {errorOn && <Alert className="mt-3" severity="error">{error}</Alert>}
          </div>
          <Formik
            initialValues={initialValue}
            validationSchema={SignIngValidation}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <InputField name="email" type="email" label="Email" />
              <InputField name="password" type="password" label="Password" />
              <Button text="Sign In"/>
            </Form>
          </Formik>

          <div className="mt-8 text-center text-emerald-200">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200
                         border-b border-emerald-400 hover:border-emerald-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
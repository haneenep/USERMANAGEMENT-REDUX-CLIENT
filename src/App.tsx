// import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setUserData } from "./redux/features/userSlice";
import Login from "./pages/Login";
import Home from "./pages/user/Home";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import AdminHome from "./pages/admin/AdminHome";
import ResetPassword from "./pages/user/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import axios from "./axios/axios";
import "react-toastify/dist/ReactToastify.css";


interface Root {
  user : {
    userData : {
      name : string;
      email : string;
      role : string;
    }
  }
}


const App = () => {
  
  const dispatch = useDispatch();

  const userData = useSelector((state: Root) => state.user.userData);

  useEffect(() => {

    const fetchingData = async () => {
      try {
        const userDetails = await axios.get("/fetchuser");

        dispatch(setUserData(userDetails.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchingData();
    
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userData?.role === "user" ? <Home /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/signup"
            element={
              !userData ? (
                <SignUp />
              ) : userData?.role === "user" ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/adminhome" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              !userData ? (
                <Login />
              ) : userData?.role === "user" ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/adminhome" />
              )
            }
          />
          <Route
            path="/home"
            element={
              userData?.role === "user" ? <Home /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/profile"
            element={
              userData?.role === "user" ? <Profile /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/reset-password"
            element={
              userData?.role === "user" ? (
                <ResetPassword />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/adminhome"
            element={
              userData?.role === "admin" ? (
                <AdminHome />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/admindashboard"
            element={
              userData?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;

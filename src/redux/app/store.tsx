import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice"
import { thunk } from "redux-thunk";


export const appStore = configureStore({
    reducer : {
        user : userSlice
    },

    middleware : ((defaultMiddleWear) => defaultMiddleWear().concat(thunk))

});
// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import projectReducer from "../features/ProjectSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer
    },
});

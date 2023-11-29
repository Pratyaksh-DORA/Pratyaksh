import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null

}

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        signup: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token);
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);

        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    }
})

export const { signup, login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        signup: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user || state.user;
            state.token = action.payload.token || state.token;
            localStorage.setItem("token", state.token);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user || state.user;
            state.token = action.payload.token || state.token;
            localStorage.setItem("token", state.token);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.clear();
        },
    },
});

export const { signup, login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

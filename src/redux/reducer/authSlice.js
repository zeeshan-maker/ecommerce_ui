import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!user,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.clear();
        }
    }
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
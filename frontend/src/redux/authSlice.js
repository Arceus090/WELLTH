import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    loginTime: null,
    role: null, // Add role field to store user's role
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            localStorage.clear();
            state.user = action.payload.others;
            state.token = action.payload.token;
            state.loginTime = Date.now();
            state.role = action.payload.others.role; // Store user's role
        },
        register(state, action) {
            localStorage.clear();
            state.user = action.payload.others;
            state.token = action.payload.token;
            state.loginTime = Date.now();
            state.role = action.payload.others.role; // Store user's role
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.loginTime = null;
            state.role = null; // Clear user's role on logout
            localStorage.clear();
        },
        handleFollow(state, action) {
            if (state.user.followings.includes(action.payload)) {
                state.user.followings = state.user.followings.filter((id) => id !== action.payload);
            } else {
                console.log(action.payload);
                state.user.followings.push(action.payload);
            }
        },
        updateUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { login, register, logout, handleFollow, updateUser } = authSlice.actions;

export default authSlice.reducer;

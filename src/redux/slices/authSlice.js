import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;

      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;

      localStorage.removeItem("currentUser");
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };

      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },

    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, logout, updateUser, finishLoading } = authSlice.actions;

export default authSlice.reducer;

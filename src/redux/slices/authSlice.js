import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
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
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, logout, finishLoading } = authSlice.actions;

export default authSlice.reducer;

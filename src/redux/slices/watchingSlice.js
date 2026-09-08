import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const watchingSlice = createSlice({
  name: "watching",
  initialState,
  reducers: {
    addToWatching: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWatching: (state, action) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    updateProgress: (state, action) => {
      const item = state.items.find((item) => item.id == action.payload.id);

      if (item) {
        item.progress = action.payload.progress;
      }
    },
    markAsCompleted: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.progress = 100;
        item.status = "completed";
      }
    },
    clearWatching: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWatching,
  removeFromWatching,
  updateProgress,
  markAsCompleted,
  clearWatching,
} = watchingSlice.actions;
export default watchingSlice.reducer;

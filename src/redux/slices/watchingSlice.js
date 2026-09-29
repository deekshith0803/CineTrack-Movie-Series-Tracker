import { createSlice } from "@reduxjs/toolkit";

const savedWatching = JSON.parse(
  localStorage.getItem("watching") || "[]"
);

const initialState = {
  items: savedWatching,
};

const watchingSlice = createSlice({
  name: "watching",

  initialState,

  reducers: {
    addToWatching: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        Object.assign(existingItem, action.payload);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("watching", JSON.stringify(state.items));
    },

    removeFromWatching: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("watching", JSON.stringify(state.items));
    },

    updateProgress: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.progress = action.payload.progress;

        if (item.progress === 100) {
          item.status = "completed";
        }

        localStorage.setItem(
          "watching",
          JSON.stringify(state.items)
        );
      }
    },

    markAsCompleted: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.progress = 100;
        item.status = "completed";

        localStorage.setItem(
          "watching",
          JSON.stringify(state.items)
        );
      }
    },

    clearWatching: (state) => {
      state.items = [];

      localStorage.removeItem("watching");
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
import { createSlice } from "@reduxjs/toolkit";

const save = (items) => localStorage.setItem("favorites", JSON.stringify(items));

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("favorites") || "[]"),
  },
  reducers: {
    addToFavorites: (state, { payload }) => {
      if (!state.items.some((i) => String(i.id) === String(payload.id))) {
        state.items.push(payload);
        save(state.items);
      }
    },
    removeFromFavorites: (state, { payload }) => {
      const id = typeof payload === "object" && payload ? payload.id : payload;
      state.items = state.items.filter((i) => String(i.id) !== String(id));
      save(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;


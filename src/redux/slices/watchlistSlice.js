import { createSlice } from "@reduxjs/toolkit";

const save = (items) => localStorage.setItem("watchlist", JSON.stringify(items));

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: JSON.parse(localStorage.getItem("watchlist") || "[]"),
  },
  reducers: {
    addToWatchlist: (state, { payload }) => {
      if (!state.items.some((i) => String(i.id) === String(payload.id))) {
        state.items.push(payload);
        save(state.items);
      }
    },
    removeFromWatchlist: (state, { payload }) => {
      const id = typeof payload === "object" && payload ? payload.id : payload;
      state.items = state.items.filter((i) => String(i.id) !== String(id));
      save(state.items);
    },
    clearWatchlist: (state) => {
      state.items = [];
      localStorage.removeItem("watchlist");
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;


import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import watchlistSlice from "./slices/watchlistSlice";
import favoritesSlice from "./slices/favoritesSlice";
import watchingSlice from "./slices/watchingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    watchlist: watchlistSlice,
    favorites: favoritesSlice,
    watching: watchingSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import movieSlice from "./slices/movieSlice";
import seriesSlice from "./slices/seriesSlice";
import watchlistSlice from "./slices/watchlistSlice";
import favoritesSlice from "./slices/favoritesSlice";
import watchingSlice from "./slices/watchingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    movie: movieSlice,
    series: seriesSlice,
    watchlist: watchlistSlice,
    favorites: favoritesSlice,
    watching: watchingSlice,
  },
});

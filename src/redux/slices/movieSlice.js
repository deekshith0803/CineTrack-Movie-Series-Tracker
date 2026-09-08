import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  searchQuery: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },

    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const {
  setMovies,
  setSelectedMovie,
  setLoading,
  setError,
  setPage,
  setTotalPages,
  setSearchQuery,
  clearSelectedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;

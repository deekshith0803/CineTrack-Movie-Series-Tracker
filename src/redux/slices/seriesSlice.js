import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
  selectedSeries: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  searchQuery: "",
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },

    setSelectedSeries: (state, action) => {
      state.selectedSeries = action.payload;
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

    clearSelectedSeries: (state) => {
      state.selectedSeries = null;
    },
  },
});

export const {
  setSeries,
  setSelectedSeries,
  setLoading,
  setError,
  setPage,
  setTotalPages,
  setSearchQuery,
  clearSelectedSeries,
} = seriesSlice.actions;

export default seriesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
     favoriteJobs: [] },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favoriteJobs.some(job => job.id === action.payload.id)) {
        state.favoriteJobs.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteJobs = state.favoriteJobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import favoritesReducer from "./slices/favoriteSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    favorites: favoritesReducer,
  },
});

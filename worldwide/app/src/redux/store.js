import { configureStore } from '@reduxjs/toolkit';
import fetchDataReducer from './fetchDataSlice';

const store = configureStore({
  reducer: {
    restaurants: fetchDataReducer,
  },
});

export default store;

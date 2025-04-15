import { configureStore } from '@reduxjs/toolkit';
import fetchBooksReducer from './fetchBooksSlice';
import shareReducer from './shareSlice';

const store = configureStore({
  reducer: {
    books: fetchBooksReducer,  
    shares: shareReducer,

  },
});

export default store;

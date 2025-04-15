import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SEARCH_URL = 'https://openlibrary.org/search.json';

export const fetchBooksByCategory = createAsyncThunk(
  'books/fetchBooksByCategory',

  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(SEARCH_URL, {
        params: { subject: category, limit: 20 }  
      });

      console.log(response.data); 

      return response.data.docs; 
    } catch (err) {
      console.error(err); 
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const fetchBooksSlice = createSlice({
  name: 'fetchBooks',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooksByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default fetchBooksSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async ({ apiKey, nextPageToken = '' }) => {
    const url = nextPageToken
      ? `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+in+Turkey&key=${apiKey}&pagetoken=${nextPageToken}`
      : `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+in+Turkey&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (data.status === 'OK') {
      return {
        results: data.results,
        nextPageToken: data.next_page_token || '',
      };
    } else {
      throw new Error(data.error_message || 'Restoranlar alınırken hata oluştu');
    }
  }
);

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
  nextPageToken: '',
};

const fetchDataSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    clearRestaurants: (state) => {
      state.restaurants = [];
      state.nextPageToken = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = [...state.restaurants, ...action.payload.results];
        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedRestaurant, clearRestaurants } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
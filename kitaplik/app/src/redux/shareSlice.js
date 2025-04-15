import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shares: [],
};

const shareSlice = createSlice({
  name: 'shares',
  initialState,
  reducers: {
    addShare: (state, action) => {
      state.shares.push(action.payload); 
    },
  },
});

export const { addShare } = shareSlice.actions;

export default shareSlice.reducer;

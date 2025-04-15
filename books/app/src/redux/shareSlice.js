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
    setShares: (state, action) => {
      state.shares = action.payload;
    }
    
  },
});

export const { addShare, setShares } = shareSlice.actions;

export default shareSlice.reducer;
   
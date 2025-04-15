import { configureStore } from '@reduxjs/toolkit';
import totalWaterReducer from './TotalWaterSlice';

export const store = configureStore({
  reducer: {
    totalWater: totalWaterReducer,
  },
});

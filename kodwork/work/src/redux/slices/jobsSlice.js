import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch("https://www.themuse.com/api/public/jobs?page=1");
  const data = await response.json();
  return data.results;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.status = "loading"; })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => { state.status = "failed"; });
  },
});

export default jobsSlice.reducer;

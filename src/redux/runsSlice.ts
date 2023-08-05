import { createSlice } from "@reduxjs/toolkit";
import { RunGroup } from "../models/RunGroup";

const initialRunState: RunGroup[] = [];

const runsSlice = createSlice({
  name: "runs",
  initialState: initialRunState,
  reducers: {
    loadRuns: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadRuns } = runsSlice.actions;
export default runsSlice.reducer;

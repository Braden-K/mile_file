import { createSlice } from "@reduxjs/toolkit";
import { RunGroup } from "../models/RunGroup";

const initialRunState: RunGroup = {
  id: 0,
  runs: [],
};

const runsSlice = createSlice({
  name: "runs",
  initialState: initialRunState,
  reducers: {
    loadRuns: (state, action) => {
      return { ...state, runs: action.payload };
    },
  },
});

export const { loadRuns } = runsSlice.actions;
export default runsSlice.reducer;

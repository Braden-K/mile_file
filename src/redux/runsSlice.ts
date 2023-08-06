import { createSlice } from "@reduxjs/toolkit";
import { Run } from "../models/Run";

const initialRunState: Run[] = [];

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

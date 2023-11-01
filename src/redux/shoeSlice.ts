import { createSlice } from "@reduxjs/toolkit";
import { Shoe } from "../models/Shoe";

const initialShoeState: Shoe[] = [];

const shoeSlice = createSlice({
  name: "shoes",
  initialState: initialShoeState,
  reducers: {
    loadShoes: (state, action) => {
      return action.payload;
    },
  },
});

export const { loadShoes } = shoeSlice.actions;
export default shoeSlice.reducer;

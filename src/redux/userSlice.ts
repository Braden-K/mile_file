import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loadUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;

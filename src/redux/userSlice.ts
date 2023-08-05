import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { id: -1, name: "", email: "" },
  reducers: {
    loadUser: (state, action) => {
      state = action.payload;
      console.log(state);
      return state;
    },
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;

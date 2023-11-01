import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import runsReducer from "../redux/runsSlice";
import shoesReducer from "../redux/shoeSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    runs: runsReducer,
    shoes: shoesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

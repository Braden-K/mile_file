import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import runsReducer from "../redux/runsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    runs: runsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

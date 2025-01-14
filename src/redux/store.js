import { configureStore } from "@reduxjs/toolkit";
import laserBlastReducer from "./slices/laserBlastSlice";

const store = configureStore({
  reducer: {
    laserBlast: laserBlastReducer,
  },
});

export default store;

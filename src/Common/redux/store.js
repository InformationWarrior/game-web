import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./slices/betsSlice";
import laserBlastReducer from "./slices/laserBlastSlice";
import wheelSpinReducer from "./slices/wheelSpinSlice"

const store = configureStore({
  reducer: {
    bets: betsReducer,
    laserBlast: laserBlastReducer,
    wheelSpin: wheelSpinReducer
  },
});

export default store;

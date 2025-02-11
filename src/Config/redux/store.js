import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./slices/betsSlice";
import wheelSpinReducer from "./slices/wheelSpinSlice"

const store = configureStore({
  reducer: {
    bets: betsReducer,
    wheelSpin: wheelSpinReducer
  },
});

export default store;

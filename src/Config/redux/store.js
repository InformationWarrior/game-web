import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "./slices/betsSlice";
import pachinkoReducer from "./slices/pachinkoSlice";
import wheelSpinReducer from "./slices/wheelSpinSlice"

const store = configureStore({
  reducer: {
    bets: betsReducer,
    pachinko: pachinkoReducer,
    wheelSpin: wheelSpinReducer
  },
});

export default store;

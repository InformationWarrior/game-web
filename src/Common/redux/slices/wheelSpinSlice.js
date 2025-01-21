import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    round: 0,
};

const wheelSpinSlice = createSlice({
    name: "wheelSpin",
    initialState,
    reducers: {
        setRound(state, action) {
            state.round = action.payload;
        },
    },
});

export const {
    setRound,
} = wheelSpinSlice.actions;

export default wheelSpinSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    riskLevel: "low",
    numberOfRows: 8,
    currency: "USDT",
    betAmount: 0.01,
    credits: 0,
    serverOutcome: null,
};

const laserBlastSlice = createSlice({
    name: "laserBlast",
    initialState,
    reducers: {
        setRiskLevel(state, action) {
            state.riskLevel = action.payload;
        },
        setNumberOfRows(state, action) {
            state.numberOfRows = action.payload;
        },
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setBetAmount(state, action) {
            state.betAmount = action.payload;
        },
        setCredits(state, action) {
            const { credits, currency } = action.payload;
            state.credits = credits;
            state.currency = currency;
        },
        setServerOutcome(state, action) {
            state.serverOutcome = action.payload;
        },
    },
});

export const {
    setRiskLevel,
    setNumberOfRows,
    setCurrency,
    setBetAmount,
    setCredits,
    setServerOutcome,
} = laserBlastSlice.actions;

export default laserBlastSlice.reducer;

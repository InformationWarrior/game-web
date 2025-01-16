import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    riskLevel: "low",
    numberOfRows: 8,
    currency: "USDT",
    betAmount: 0.01,
    serverOutcome: null,
    wallet: { remainingCredits: 0, currency: "USDT" },
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
        setServerOutcome(state, action) {
            state.serverOutcome = action.payload;
        },
        setWallet(state, action) {
            state.wallet = {
                ...state.wallet,
                remainingCredits: action.payload.remainingCredits,
                currency: action.payload.currency,
            };
        },

    },
});

export const {
    setRiskLevel,
    setNumberOfRows,
    setCurrency,
    setBetAmount,
    setServerOutcome,
    setWallet,
} = laserBlastSlice.actions;

export default laserBlastSlice.reducer;

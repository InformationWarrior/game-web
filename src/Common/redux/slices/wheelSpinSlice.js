import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlayerRound: 0,
    totalPlayerRounds: 0,
    currency: "ETH",
    betAmount: 0.01,
    credits: 100,
    gameState: "RESET",
    serverOutcome: null,
};

const wheelSpinSlice = createSlice({
    name: "wheelSpin",
    initialState,
    reducers: {
        setCurrentPlayerRound(state, action) {
            state.currentPlayerRound = action.payload;
        },
        setTotalPlayerRounds(state, action) {
            state.totalPlayerRounds = action.payload;
        },
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setBetAmount(state, action) {
            state.betAmount = action.payload;
        },
        setCredits(state, action) {
            state.credits = action.payload;;
        },
        setGameState(state, action) {
            state.gameState = action.payload;
        },
        setServerOutcome(state, action) {
            state.serverOutcome = action.payload;
        },
    },
});

export const {
    setCurrentPlayerRound,
    setTotalPlayerRounds,
    setCurrency,
    setBetAmount,
    setCredits,
    setGameState,
    setServerOutcome,
} = wheelSpinSlice.actions;

export default wheelSpinSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    riskLevel: "low", // Represents the risk level (low, medium, high)
    numberOfRows: 8,  // Represents the number of rows
    serverOutcome: null,
    // credits: 1000,
    // currentBetIndex: 0,
    // totalWin: 0,
    // overallTotalWin: 0,
    // currentMultiplier: null,
};

const laserBlastSlice = createSlice({
    name: "laserBlast", // Updated name to represent the Laser Blast context
    initialState,
    reducers: {
        setRiskLevel(state, action) {
            state.riskLevel = action.payload; // Updates risk level
        },
        setNumberOfRows(state, action) {
            state.numberOfRows = action.payload; // Updates number of rows
        },
        setServerOutcome: (state, action) => {
            state.serverOutcome = action.payload;
        },
        // setCredits(state, action) {
        //     state.credits = action.payload;
        // },
        // setBetIndex(state, action) {
        //     state.currentBetIndex = action.payload;
        // },
        // setTotalWin(state, action) {
        //     state.totalWin = action.payload;
        // },
        // setOverallTotalWin(state, action) {
        //     state.overallTotalWin = action.payload;
        // },
        // setMultiplier(state, action) {
        //     state.currentMultiplier = action.payload;
        // },
    },
});

export const {
    setRiskLevel,
    setNumberOfRows,
    setServerOutcome,
    // setCredits,
    // setBetIndex,
    // setTotalWin,
    // setOverallTotalWin,
    // setMultiplier,
} = laserBlastSlice.actions;

export default laserBlastSlice.reducer;

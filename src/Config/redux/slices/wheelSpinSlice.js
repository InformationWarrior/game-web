import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameRound: 1,
    totalPlayerRounds: 0,
    currency: "ETH",
    betAmount: 0.01,
    walletAmount: 100,
    gameState: null,
    remainingTime: 0,
    inGameMessage: "",
    playerColor: null,
    serverOutcome: null,
};

const wheelSpinSlice = createSlice({
    name: "wheelSpin",
    initialState,
    reducers: {
        setGameRound(state, action) {
            state.gameRound = action.payload;
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
        setWalletAmount(state, action) {
            state.walletAmount = action.payload;;
        },
        setInGameMessage(state, action) {
            state.inGameMessage = action.payload;
        },
        clearMessage(state) {
            state.inGameMessage = "";
        },
        setPlayerColor(state, action) {
            state.playerColor = action.payload;
        },
        setServerOutcome(state, action) {
            state.serverOutcome = action.payload;
        },
        updateGameState(state, action) {
            const { gameState, remainingTime } = action.payload;
            console.log("🔥 Updating Redux State:", gameState, remainingTime); // Debugging
            state.gameState = gameState;
            state.remainingTime = remainingTime;
        },
        decrementTimer(state) {
            if (state.remainingTime > 0) {
                state.remainingTime -= 1;
            }
        },
    },
});

export const {
    setGameRound,
    setTotalPlayerRounds,
    setCurrency,
    setBetAmount,
    setWalletAmount,
    setInGameMessage,
    clearMessage,
    setPlayerColor,
    setServerOutcome,
    updateGameState,
    decrementTimer
} = wheelSpinSlice.actions;

export default wheelSpinSlice.reducer;

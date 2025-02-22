import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../NetworkManager/apollo/client";
import { PLACE_BET } from "../../../NetworkManager/graphql/Operations/mutations";
import { BET_PLACED_SUBSCRIPTION } from "../../../NetworkManager/graphql/Operations/subscriptions";

// ✅ Place bet mutation
export const placeBet = createAsyncThunk(
    "wheelSpin/placeBet",
    async ({ gameId, walletAddress, betAmount, totalPlayerRounds, currency }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: PLACE_BET,
                variables: { gameId, walletAddress, betAmount, totalPlayerRounds, currency },
            });

            return data.placeBet;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Subscribe to Bet Placed events
export const betPlaced = createAsyncThunk(
    "wheelSpin/betPlaced",
    async ({ gameId, walletAddress }, { dispatch }) => {
        try {
            console.log("🟢 Starting BET_PLACED subscription with:", { gameId, walletAddress });

            const observable = client.subscribe({
                query: BET_PLACED_SUBSCRIPTION,
                variables: { gameId, walletAddress },
            });

            observable.subscribe({
                next({ data }) {
                    console.log("📢 Bet Placed Subscription Triggered!");
                    console.log("🔍 Subscription Data Received:", data);

                    if (data && data.betPlaced) {
                        console.log("✅ Dispatching handleBetPlaced with:", data.betPlaced);
                        dispatch(handleBetPlaced(data.betPlaced));
                    } else {
                        console.warn("⚠️ Unexpected subscription payload:", data);
                    }
                },
                error(err) {
                    console.error("❌ Subscription error:", err);
                },
            });

            console.log("🟢 Subscription successfully started.");
        } catch (error) {
            console.error("❌ Error starting subscription:", error);
        }
    }
);

const initialState = {
    gameRound: 1,
    totalPlayerRounds: 1,
    currency: "ETH",
    betAmount: 0.01,
    walletAmount: 100,
    gameState: null,
    remainingTime: 0,
    inGameMessage: "",
    playerColor: null,
    serverOutcome: null,
    isPlacingBet: false,
    betError: null,
    bets: [],
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
            state.walletAmount = action.payload;
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
        setGameState(state, action) {
            state.gameState = action.payload;

            // ✅ Clear bets when game state is RESET
            if (action.payload === "RESET") {
                state.bets = [];
            }
        },
        updateGameState(state, action) {
            const { gameState, remainingTime } = action.payload;
            state.gameState = gameState;
            state.remainingTime = remainingTime;

            // ✅ Clear bets when game state is RESET
            if (gameState === "RESET") {
                state.bets = [];
            }
        },
        decrementTimer(state) {
            if (state.remainingTime > 0) {
                state.remainingTime -= 1;
            }
        },
        addBet(state, action) {
            state.bets.push(action.payload);
        },
        resetGame(state) {
            // ✅ Clear bets when game resets
            state.bets = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeBet.pending, (state) => {
                state.isPlacingBet = true;
                state.betError = null;
            })
            .addCase(placeBet.fulfilled, (state, action) => {
                state.isPlacingBet = false;
                console.log("✅ Bet placed successfully:", action.payload);

                // ✅ Avoid duplicate bets
                const isDuplicate = state.bets.some(
                    (bet) => bet.walletAddress === action.payload.walletAddress && bet.amount === action.payload.amount
                );

                if (!isDuplicate) {
                    state.bets.push(action.payload);
                } else {
                    console.log("⚠️ Duplicate bet detected from mutation, skipping:", action.payload);
                }
            })
            .addCase(placeBet.rejected, (state, action) => {
                state.isPlacingBet = false;
                state.betError = action.payload;
            });
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
    setGameState,
    updateGameState,
    decrementTimer,
    addBet,
    resetGame,
} = wheelSpinSlice.actions;

export default wheelSpinSlice.reducer;

// ✅ Handle bet placement without duplicates
export const handleBetPlaced = (betData) => (dispatch, getState) => {
    const state = getState();
    const existingBets = state.wheelSpin.bets; // ✅ Ensure accessing correct slice

    // ✅ Check if the bet already exists in Redux
    const isDuplicate = existingBets.some(
        (bet) => bet.walletAddress === betData.walletAddress && bet.amount === betData.amount
    );

    if (!isDuplicate) {
        console.log("🔥 Dispatching handleBetPlaced:", betData);
        dispatch(addBet(betData));
    } else {
        console.log("⚠️ Duplicate bet detected from subscription, skipping:", betData);
    }
};

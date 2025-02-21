import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../NetworkManager/apollo/client";
import { PLACE_BET } from "../../../NetworkManager/graphql/Operations/mutations";
import { BET_PLACED_SUBSCRIPTION } from "../../../NetworkManager/graphql/Operations/subscriptions";

// Place bet mutation
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

// Subscribe to Bet Placed events
export const betPlaced = createAsyncThunk(
    "wheelSpin/betPlaced",
    async ({ gameId, walletAddress }, { dispatch }) => {
        try {
            console.log("🟢 Starting BET_PLACED subscription with:", { gameId, walletAddress });

            const observable = client.subscribe({
                query: BET_PLACED_SUBSCRIPTION,
                variables: { gameId, walletAddress }, // ✅ Pass required variables
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
        },
        updateGameState(state, action) {
            const { gameState, remainingTime } = action.payload;
            state.gameState = gameState;
            state.remainingTime = remainingTime;
        },
        decrementTimer(state) {
            if (state.remainingTime > 0) {
                state.remainingTime -= 1;
            }
        },
        addBet(state, action) {
            state.bets.push(action.payload);
        },
        handleBetPlaced(state, action) {
            console.log("📢 Bet Placed Subscription Received:", action.payload);
            state.bets.push(action.payload);
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
                state.bets.push(action.payload);
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
    handleBetPlaced,
} = wheelSpinSlice.actions;

export default wheelSpinSlice.reducer;

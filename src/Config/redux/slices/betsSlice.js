import { createSlice } from '@reduxjs/toolkit';
import {
  createPlayer,
  enterGame,
  getEnteredPlayers,
  playerEntered,
  placeBetAndParticipate,
  getParticipantsAndBets,
  getRound,
  RoundUpdates,
  leaveGame,
  // getAllGames
} from './betsActions';

const initialState = {
  games: [],
  currentGame: null,
  gameId: "67c7c5786a43f19451f8dcd9",
  enteredPlayers: [],
  participants: [],
  bets: [],
  spectators: [],
  round: null,
  winner: null,
  player: {
    walletAddress: null,
    username: null,
    balance: 0,
    currency: null
  },
  networkStatus: {
    loading: false,
    error: null,
  },
};

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    setGames(state, action) {
      state.games = action.payload;
    },
    setCurrentGame(state, action) {
      state.currentGame = action.payload;
    },

    //Check this variable
    setEnteredPlayers(state, action) {
      state.enteredPlayers = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setParticipants(state, action) {
      state.participants = action.payload;
    },
    setBets(state, action) {
      state.bets = action.payload;
    },
    updateRound: (state, action) => {
      state.round = action.payload;
    },
    setParticipantsAndBets: (state, action) => {
      state.participants = action.payload.participants;
      state.bets = action.payload.bets;
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
    resetRound: (state) => {
      state.round = null;
    },
    setLoading(state, action) {
      state.networkStatus.loading = action.payload;
    },
    setError(state, action) {
      state.networkStatus.error = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    resetWinner: (state) => {
      state.winner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRound.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(getRound.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.round = action.payload;
        state.participants = action.payload.participants;
        state.bets = action.payload.bets;
      })
      .addCase(getRound.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
      // ✅ placeBetAndParticipate
      .addCase(placeBetAndParticipate.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(placeBetAndParticipate.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        // console.log("Place bet and participate network status is false.")
        // state.bets.push(action.payload); // ✅ Add bet to Redux store
        // state.participants.push(action.payload); // ✅ Add participant to Redux store
      })
      .addCase(placeBetAndParticipate.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
      // ✅ createPlayer
      .addCase(createPlayer.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.player = action.payload.player;
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
      // ✅ enterGame
      .addCase(enterGame.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(enterGame.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(enterGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
      // ✅ getEnteredPlayers
      .addCase(getEnteredPlayers.fulfilled, (state, action) => {
        // console.log("Fetched Entered Players from API:", action.payload);
        state.enteredPlayers = action.payload;
      })
      .addCase(getParticipantsAndBets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParticipantsAndBets.fulfilled, (state, action) => {
        state.loading = false;

        // Merge participants, avoiding duplicates
        const updatedParticipants = [
          ...new Map(
            [...state.participants, ...action.payload.participants].map((p) => [p.walletAddress, p])
          ).values(),
        ];

        // Merge bets, avoiding duplicates
        const updatedBets = [
          ...new Map(
            [...state.bets, ...action.payload.bets].map((b) => [b.id, b])
          ).values(),
        ];

        state.participants = updatedParticipants;
        state.bets = updatedBets;
      })
      .addCase(getParticipantsAndBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ leaveGame
      .addCase(leaveGame.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(leaveGame.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(leaveGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
    // .addCase(getAllGames.fulfilled, (state, action) => {
    //   state.games = action.payload
    // });
  },
});

export const {
  setRound,
  resetRound,
  setGames,
  setCurrentGame,
  setEnteredPlayers,
  setPlayer,
  setParticipants,
  setBets,
  updateRound,
  setNetworkStatus,
  setLoading,
  setError,
  setParticipantsAndBets,
  setWinner,
  resetWinner,
} = betsSlice.actions;

export default betsSlice.reducer;
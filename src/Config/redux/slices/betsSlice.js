import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: {
    id: null,
    name: "BETS",
  },
  games: [], // List of all games (e.g., Wheel Spin, Pachinko)
  currentGame: null, // The active game the user is playing
  players: [], // List of players in the current game
  player: null, // Current player details
  networkStatus: {
    loading: false,
    error: null,
  },
};

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setGames(state, action) {
      state.games = action.payload;
    },
    setCurrentGame(state, action) {
      state.currentGame = action.payload;
    },
    setPlayers(state, action) {
      state.players = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
  },
});

export const {
  setGames,
  setCurrentGame,
  setPlayers,
  setPlayer,
  setNetworkStatus,
} = betsSlice.actions;

export default betsSlice.reducer;

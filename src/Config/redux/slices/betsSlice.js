import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "../../../NetworkManager/apollo/client"
import {
  CREATE_PLAYER,
  ENTER_GAME,
  PARTICIPATE_IN_GAME,
  SAVE_WALLET_DATA,
} from "../../../NetworkManager/graphql/modules/BETS/mutations"


// Async thunk to create a player
export const createPlayer = createAsyncThunk(
  "bets/createPlayer",
  async ({ walletAddress, username }, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_PLAYER,
        variables: { walletAddress, username },
      });

      const playerData = response.data.createPlayer;
      return playerData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to save wallet data
export const saveWalletData = createAsyncThunk(
  'bets/saveWalletData',
  async ({ address, balance, currency }, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: SAVE_WALLET_DATA,
        variables: { address, balance, currency },
      });
      const data = response.data.saveWalletData;
      if (data.success) {
        return { address, balance, currency };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to enter a game (viewing but not necessarily playing)
export const enterGame = createAsyncThunk(
  "bets/enterGame",
  async ({ gameId, walletAddress }, { rejectWithValue }) => {
    try {
      console.log("Sending enterGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: ENTER_GAME,
        variables: { gameId, walletAddress },
      });

      if (!response.data || !response.data.enterGame) {
        throw new Error("Invalid response from enterGame mutation");
      }

      return response.data.enterGame;
    } catch (error) {
      console.error("enterGame error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to participate in the game (player actually plays)
export const participateInGame = createAsyncThunk(
  "bets/participateInGame",
  async ({ gameId, walletAddress }, { rejectWithValue }) => {
    try {
      console.log("Sending participateInGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: PARTICIPATE_IN_GAME,
        variables: { gameId, walletAddress },
      });

      if (!response.data || !response.data.participateInGame) {
        throw new Error("Invalid response from participateInGame mutation");
      }

      return response.data.participateInGame;
    } catch (error) {
      console.error("participateInGame error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  project: {
    id: null,
    name: 'BETS',
  },
  games: [],
  currentGame: null,
  players: [],
  participatedPlayers: [],
  player: null,
  wallet: {
    address: null,
    balance: 0,
    currency: null,
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
    setPlayers(state, action) {
      state.players = action.payload;
    },
    setParticipatedPlayers(state, action) {
      state.participatedPlayers = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ saveWalletData
      .addCase(saveWalletData.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(saveWalletData.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.wallet = action.payload;
      })
      .addCase(saveWalletData.rejected, (state, action) => {
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
        state.player = action.payload;
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
        state.currentGame = action.payload; // Store updated game details
      })
      .addCase(enterGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })

      // ✅ participateInGame
      .addCase(participateInGame.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(participateInGame.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.currentGame = action.payload; // Store updated game details
      })
      .addCase(participateInGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      });
  },
});

export const {
  setGames,
  setCurrentGame,
  setPlayers,
  setParticipatedPlayers,
  setPlayer,
  setNetworkStatus,
} = betsSlice.actions;

export default betsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "../../../NetworkManager/apollo/client"
import { SAVE_WALLET_DATA } from "../../../NetworkManager/graphql/modules/BETS/mutations"
import { JOIN_GAME } from "../../../NetworkManager/graphql/modules/BETS/mutations"
import { CREATE_PLAYER } from "../../../NetworkManager/graphql/modules/BETS/mutations"

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

export const joinGame = createAsyncThunk(
  "bets/joinGame",
  async ({ gameId, walletAddress }, { rejectWithValue }) => {
    try {
      console.log("Sending joinGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: JOIN_GAME,
        variables: { gameId, walletAddress },
      });

      console.log("joinGame response:", response.data);
      if (!response.data || !response.data.joinGame) {
        throw new Error("Invalid response from joinGame mutation");
      }

      return response.data.joinGame;
    } catch (error) {
      console.error("joinGame error:", error);
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
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWalletData.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
        console.log("saveWalletData.pending");
      })
      .addCase(saveWalletData.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.wallet = action.payload;
        console.log("saveWalletData.fulfilled with payload:", action.payload);
      })
      .addCase(saveWalletData.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
        console.log("saveWalletData.rejected with error:", action.payload);
      })

      .addCase(createPlayer.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.player = action.payload; // Save player in Redux state
        console.log("Player created:", action.payload);
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
        console.error("Error creating player:", action.payload);
      })

      // ✅ Corrected placement of joinGame reducers
      .addCase(joinGame.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.currentGame = action.payload; // Store updated game details
        console.log("Joined game successfully:", action.payload);
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      });
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

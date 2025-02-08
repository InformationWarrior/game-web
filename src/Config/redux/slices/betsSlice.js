import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "../../../NetworkManager/apollo/client"
import { SAVE_WALLET_DATA } from "../../../NetworkManager/graphql/modules/BETS/mutations"

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
        console.log('saveWalletData.pending');
      })
      .addCase(saveWalletData.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.wallet = action.payload;
        console.log('saveWalletData.fulfilled with payload:', action.payload);
      })
      .addCase(saveWalletData.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
        console.log('saveWalletData.rejected with error:', action.payload);
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

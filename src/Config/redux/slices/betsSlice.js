import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "../../../NetworkManager/apollo/client"
import {
  CREATE_PLAYER,
  ENTER_GAME,
  LEAVE_GAME,
  PARTICIPATE_IN_GAME,
  PLACE_BET,
} from "../../../NetworkManager/graphql/Operations/mutations"
import { GET_ENTERED_PLAYERS, GET_PARTICIPANTS } from "../../../NetworkManager/graphql/Operations/queries";
import { PLAYER_ENTERED_SUBSCRIPTION, PLAYER_PARTICIPATED_SUBSCRIPTION } from '../../../NetworkManager/graphql/Operations/subscriptions';

// Async thunk to create a player
export const createPlayer = createAsyncThunk(
  "bets/createPlayer",
  async ({ walletAddress, username, balance, currency }, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_PLAYER,
        variables: { walletAddress, username, balance, currency },
      });

      const playerData = response.data.createPlayer;
      return playerData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to enter a game and fetch entered players
export const enterGame = createAsyncThunk(
  "bets/enterGame",
  async ({ gameId, walletAddress }, { rejectWithValue, dispatch }) => {
    try {
      console.log("Sending enterGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: ENTER_GAME,
        variables: { gameId, walletAddress },
      });

      if (!response.data || !response.data.enterGame) {
        throw new Error("Invalid response from enterGame mutation");
      }

      const enteredGame = response.data.enterGame;
      dispatch(getEnteredPlayers(gameId)); // Fetch entered players after entering the game
      return enteredGame;
    } catch (error) {
      console.error("enterGame error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to get entered players
export const getEnteredPlayers = createAsyncThunk(
  "bets/getEnteredPlayers",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: GET_ENTERED_PLAYERS,
        variables: { gameId },
        fetchPolicy: "network-only",
      });
      // console.log("API Response for Entered Players:", response); // Log API response

      if (!response.data || !response.data.getEnteredPlayers) {
        throw new Error("Failed to fetch entered players.");
      }

      return response.data.getEnteredPlayers;
    } catch (error) {
      console.error("getEnteredPlayers error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to participate in a game
export const participateInGame = createAsyncThunk(
  "bets/participateInGame",
  async ({ gameId, walletAddress }, { rejectWithValue, dispatch }) => {
    try {
      console.log("Sending participateInGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: PARTICIPATE_IN_GAME,
        variables: { gameId, walletAddress },
      });

      if (!response.data || !response.data.participateInGame) {
        throw new Error("Invalid response from participateInGame mutation");
      }

      const participatedGame = response.data.participateInGame;
      dispatch(getParticipants(gameId)); // Fetch participants after participation
      return participatedGame;
    } catch (error) {
      console.error("participateInGame error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to get participants
export const getParticipants = createAsyncThunk(
  "bets/getParticipants",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: GET_PARTICIPANTS,
        variables: { gameId },
        fetchPolicy: "network-only",
      });

      // console.log("API Response for Participants:", response);

      if (!response.data || !response.data.getParticipants) {
        throw new Error("Failed to fetch participants.");
      }

      return response.data.getParticipants;
    } catch (error) {
      console.error("getParticipants error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Subscription: Player Entered
export const playerEntered = (gameId) => (dispatch, getState) => {
  const { player } = getState().bets; // ✅ Get the player's walletAddress from Redux state
  if (!player.walletAddress) {
    console.error("❌ Missing walletAddress for subscription");
    return;
  }

  client
    .subscribe({
      query: PLAYER_ENTERED_SUBSCRIPTION,
      variables: { gameId, walletAddress: player.walletAddress }, // ✅ Pass walletAddress
    })
    .subscribe({
      next({ data }) {
        if (data && data.playerEntered) {
          console.log("✅ Player Entered:", data.playerEntered);

          // ✅ Update Redux state with new entered players
          dispatch(getEnteredPlayers(gameId));
        }
      },
      error(err) {
        console.error("❌ Subscription error:", err);
      },
    });
};

// ✅ Subscription: Player Participated
export const playerParticipated = (gameId) => (dispatch, getState) => {
  const { player } = getState().bets; // ✅ Get walletAddress from Redux state
  if (!player.walletAddress) {
    console.error("❌ Missing walletAddress for subscription");
    return;
  }

  client
    .subscribe({
      query: PLAYER_PARTICIPATED_SUBSCRIPTION,
      variables: { gameId, walletAddress: player.walletAddress }, // ✅ Pass walletAddress
    })
    .subscribe({
      next({ data }) {
        if (data && data.playerParticipated) {
          console.log("✅ Player Participated:", data.playerParticipated);

          // ✅ Update Redux state
          const { participatedPlayers } = getState().bets;
          dispatch(updateParticipatedPlayers([...participatedPlayers, data.playerParticipated]));
        }
      },
      error(err) {
        console.error("❌ Subscription error:", err);
      },
    });
};

export const leaveGame = createAsyncThunk(
  "bets/leaveGame",
  async ({ gameId, walletAddress }, { rejectWithValue }) => {
    try {
      console.log("Sending leaveGame mutation for:", { gameId, walletAddress });
      const response = await client.mutate({
        mutation: LEAVE_GAME,
        variables: { gameId, walletAddress },
      });

      if (!response.data || !response.data.leaveGame) {
        throw new Error("Invalid response from leaveGame mutation");
      }

      return response.data.leaveGame;
    } catch (error) {
      console.error("leaveGame error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const placeBet = createAsyncThunk(
  "bets/placeBet",
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

const initialState = {
  games: [],
  currentGame: null,
  gameId: "67b42091dad8e320e611a165",

  enteredPlayers: [],
  participants: [],
  spectators: [],
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
    setPlayers(state, action) {
      state.players = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
    updateParticipatedPlayers(state, action) {
      state.participants = action.payload;
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      // ✅ participateInGame
      .addCase(participateInGame.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(participateInGame.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.currentGame = action.payload;

        // ✅ Update Redux participated players list
        if (!state.participants.some(p => p.walletAddress === action.payload.walletAddress)) {
          state.participants.push(action.payload);
        }
      })
      .addCase(participateInGame.rejected, (state, action) => {
        state.networkStatus.loading = false;
        state.networkStatus.error = action.payload;
      })
      // ✅ getParticipants
      .addCase(getParticipants.fulfilled, (state, action) => {
        // console.log("Fetched Participants from API:", action.payload);
        state.participants = action.payload;
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
      });
  },
});

export const {
  setGames,
  setCurrentGame,
  setPlayers,
  setPlayer,
  updateParticipatedPlayers,
  setNetworkStatus,
} = betsSlice.actions;

export default betsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from "../../../NetworkManager/apollo/client"
import {
  CREATE_PLAYER,
  ENTER_GAME,
  LEAVE_GAME,
  PLACE_BET_AND_PARTICIPATE,
} from "../../../NetworkManager/graphql/mutations"
// import { GET_ENTERED_PLAYERS, GET_PARTICIPANTS, GET_BETS, GET_ALL_GAMES, } from "../../../NetworkManager/graphql/Operations/queries";
import { GET_ENTERED_PLAYERS, GET_PARTICIPANTS, GET_BETS } from "../../../NetworkManager/graphql/queries";
import { PLAYER_ENTERED_SUBSCRIPTION, PLAYER_PARTICIPATED, BET_PLACED } from '../../../NetworkManager/graphql/subscriptions';
import wheelSpinLogo from '../../../Games/WheelSpin/assets/SpinWheelBanner.webp'
import WheelSpin from '../../../Games/WheelSpin/WheelSpin'

// ✅ Async thunk to place bet and participate
export const placeBetAndParticipate = createAsyncThunk(
  "bets/placeBetAndParticipate",
  async ({ gameId, walletAddress, betAmount, currency }, { rejectWithValue }) => {
    try {
      console.log("Placing bet and participating:", { gameId, walletAddress, betAmount, currency });

      const response = await client.mutate({
        mutation: PLACE_BET_AND_PARTICIPATE,
        variables: { gameId, walletAddress, betAmount, currency },
      });

      if (!response.data || !response.data.placeBetAndParticipate) {
        throw new Error("Invalid response from placeBetAndParticipate mutation");
      }

      const betData = response.data.placeBetAndParticipate;
      return betData;
    } catch (error) {
      console.error("placeBetAndParticipate error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async thunk to fetch participants
export const getParticipants = createAsyncThunk(
  "bets/getParticipants",
  async (gameId, { rejectWithValue }) => {
    try {
      console.log("Fetching participants for game:", gameId);

      const response = await client.query({
        query: GET_PARTICIPANTS,
        variables: { gameId },
        fetchPolicy: "network-only", // Ensure fresh data from server
      });

      if (!response.data || !response.data.getParticipants) {
        throw new Error("Invalid response from getParticipants query");
      }

      return response.data.getParticipants;
    } catch (error) {
      console.error("getParticipants error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const betPlaced = (gameId) => (dispatch, getState) => {
  client.subscribe({
    query: BET_PLACED,
    variables: { gameId },
  }).subscribe({
    next({ data }) {
      if (data && data.betPlaced) {
        console.log("✅ New bet placed:", data.betPlaced);

        // ✅ Directly update Redux state instead of re-fetching all bets
        // dispatch(setBets([...getState().bets.bets, data.betPlaced]));
        const currentBets = getState().bets.bets;
        dispatch(setBets([...currentBets, data.betPlaced]));

        // dispatch(setBets((prevBets) => [...prevBets, data.betPlaced]));

      }
    },
    error(err) {
      console.error("❌ Subscription error:", err);
    },
  });
};


// ✅ Fetch all bets
export const getBets = createAsyncThunk(
  "bets/getBets",
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await client.query({
        query: GET_BETS,
        variables: { gameId },
        fetchPolicy: "network-only",
      });

      if (!response.data || !response.data.getBets) {
        throw new Error("Failed to fetch bets.");
      }

      return response.data.getBets;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// export const playerParticipated = (gameId) => (dispatch, getState) => {
//   client.subscribe({
//     query: PLAYER_PARTICIPATED,
//     variables: { gameId },
//   }).subscribe({
//     next({ data }) {
//       if (data && data.playerParticipated) {
//         console.log("✅ New participant:", data.playerParticipated);

//         // ✅ Avoid duplicates
//         const { participants } = getState().bets;
//         const exists = participants.some(p => p.walletAddress === data.playerParticipated.walletAddress);

//         if (!exists) {
//           dispatch(setParticipants([...participants, data.playerParticipated]));
//         }
//       }
//     },
//     error(err) {
//       console.error("❌ Subscription error:", err);
//     },
//   });
// };


let playerParticipatedSubscription = null; // Store subscription reference

export const playerParticipated = (gameId) => (dispatch, getState) => {
  if (playerParticipatedSubscription) {
    console.warn("⚠️ Player participation subscription already active.");
    return;
  }

  playerParticipatedSubscription = client.subscribe({
    query: PLAYER_PARTICIPATED,
    variables: { gameId },
  }).subscribe({
    next({ data }) {
      if (data?.playerParticipated) {
        console.log("✅ New participant:", data.playerParticipated);

        const { participants } = getState().bets;
        const participantSet = new Set(participants.map(p => p.walletAddress));

        if (!participantSet.has(data.playerParticipated.walletAddress)) {
          dispatch(setParticipants([...participants, data.playerParticipated]));
        } else {
          console.log("⚠️ Duplicate participant detected, skipping update.");
        }
      }
    },
    error(err) {
      console.error("❌ Subscription error:", err);
    },
  });
};

// export const playerParticipated = (gameId) => (dispatch, getState) => {
//   if (playerParticipatedSubscription) {
//     console.warn("⚠️ Player participation subscription already active.");
//     return;
//   }

//   playerParticipatedSubscription = client.subscribe({
//     query: PLAYER_PARTICIPATED,
//     variables: { gameId },
//   }).subscribe({
//     next({ data }) {
//       if (data?.playerParticipated) {
//         console.log("✅ New participant:", data.playerParticipated);

//         const { participants } = getState().bets;

//         // ✅ Use a Map for faster lookup
//         const participantMap = new Map(participants.map(p => [p.walletAddress, p]));

//         if (!participantMap.has(data.playerParticipated.walletAddress)) {
//           dispatch(setParticipants([...participants, data.playerParticipated]));
//         } else {
//           console.log("⚠️ Duplicate participant detected, skipping update.");
//         }
//       }
//     },
//     error(err) {
//       console.error("❌ Subscription error:", err);
//     },
//   });
// };



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

// ✅ Subscription: Player Entered
// export const playerEntered = (gameId) => (dispatch, getState) => {
//   const { player } = getState().bets; // ✅ Get the player's walletAddress from Redux state
//   if (!player.walletAddress) {
//     console.error("❌ Missing walletAddress for subscription");
//     return;
//   }

//   client
//     .subscribe({
//       query: PLAYER_ENTERED_SUBSCRIPTION,
//       variables: { gameId, walletAddress: player.walletAddress }, // ✅ Pass walletAddress
//     })
//     .subscribe({
//       next({ data }) {
//         if (data && data.playerEntered) {
//           console.log("✅ Player Entered:", data.playerEntered);

//           // ✅ Update Redux state with new entered players
//           dispatch(getEnteredPlayers(gameId));
//         }
//       },
//       error(err) {
//         console.error("❌ Subscription error:", err);
//       },
//     });
// };

export const playerEntered = (gameId) => (dispatch, getState) => {
  const { player } = getState().bets;
  if (!player.walletAddress) {
    console.error("❌ Missing walletAddress for subscription");
    return;
  }

  client.subscribe({
    query: PLAYER_ENTERED_SUBSCRIPTION,
    variables: { gameId, walletAddress: player.walletAddress },
  }).subscribe({
    next({ data }) {
      if (data && data.playerEntered) {
        console.log("✅ Player Entered:", data.playerEntered);

        const { enteredPlayers } = getState().bets;
        const exists = enteredPlayers.some(p => p.walletAddress === data.playerEntered.walletAddress);

        if (!exists) {
          dispatch(setEnteredPlayers([...enteredPlayers, data.playerEntered]));
        }
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

// export const getAllGames = createAsyncThunk(
//   'bets/getAllGames',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await client.query({
//         query: GET_ALL_GAMES,
//         variables: {},
//         fetchPolicy: 'network-only'
//       })

//       console.log('All Games:::::', response.data.getAllGames)

//       if (!response.data || response.data.getAllGames.length <= 0) {
//         return []
//       }

//       return response.data.getAllGames.map(game => ({
//         id: game._id,
//         title: game.name,
//         description: game.type,
//         type: game.type,
//         path: '/wheel-spin',
//         imgSrc: wheelSpinLogo,
//         element: <WheelSpin />
//       }))
//     } catch (error) {
//       console.error('getEnteredPlayers error:', error)
//       return rejectWithValue(error.message)
//     }
//   }
// );

const initialState = {
  games: [],
  currentGame: null,
  gameId: "67c878e7439730923cded336",
  enteredPlayers: [],
  participants: [],
  bets: [],
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
    resetParticipants(state) {
      state.participants = [];
    },
    resetBets(state) {
      state.bets = [];
    },
    setNetworkStatus(state, action) {
      state.networkStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBets.fulfilled, (state, action) => {
        state.bets = action.payload;
      })
      // ✅ getParticipants
      .addCase(getParticipants.pending, (state) => {
        state.networkStatus.loading = true;
        state.networkStatus.error = null;
      })
      .addCase(getParticipants.fulfilled, (state, action) => {
        state.networkStatus.loading = false;
        state.participants = action.payload; // ✅ Update Redux store with participants
      })
      .addCase(getParticipants.rejected, (state, action) => {
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
        state.bets.push(action.payload); // ✅ Add bet to Redux store
        state.participants.push(action.payload); // ✅ Add participant to Redux store
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
  setGames,
  setCurrentGame,
  setEnteredPlayers,
  setPlayer,
  setParticipants,
  setBets,
  // updateParticipatedPlayers,
  setNetworkStatus,
  resetParticipants, resetBets,
} = betsSlice.actions;

export default betsSlice.reducer;
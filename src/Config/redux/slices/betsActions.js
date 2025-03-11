import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../../NetworkManager/apollo/client';
import {
  CREATE_PLAYER,
  ENTER_GAME,
  LEAVE_GAME,
  PLACE_BET_AND_PARTICIPATE,
} from '../../../NetworkManager/graphql/mutations';
import { GET_ROUND, GET_ENTERED_PLAYERS, GET_PARTICIPANTS_AND_BETS } from '../../../NetworkManager/graphql/queries';
import { PLAYER_ENTERED_SUBSCRIPTION, ROUND_UPDATED_SUBSCRIPTION } from '../../../NetworkManager/graphql/subscriptions';
import { setEnteredPlayers, setParticipants, setBets, setRound, setError } from './betsSlice';
import wheelSpinLogo from '../../../Games/WheelSpin/assets/SpinWheelBanner.webp'
import WheelSpin from '../../../Games/WheelSpin/WheelSpin'

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

      const enteredPlayer = response.data.enterGame;

      // ✅ Store entered player in Redux (update as per your store structure)
      dispatch(setEnteredPlayers(enteredPlayer));

      return enteredPlayer;
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

      // ✅ Handle GraphQL errors explicitly
      if (response.errors) {
        console.error("GraphQL Error in getEnteredPlayers:", response.errors);
        throw new Error(response.errors[0]?.message || "GraphQL request failed");
      }

      // ✅ Ensure response structure is correct
      if (!response.data || !Array.isArray(response.data.getEnteredPlayers)) {
        console.warn("No entered players found for game:", gameId);
        return []; // ✅ Return an empty array instead of throwing
      }

      return response.data.getEnteredPlayers;
    } catch (error) {
      console.error("getEnteredPlayers error:", error);
      return rejectWithValue(error.message);
    }
  }
);

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

      return { success: true, message: "Place Bet and participate mutation." };
    } catch (error) {
      console.error("placeBetAndParticipate error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getParticipantsAndBets = createAsyncThunk(
  "bets/getParticipantsAndBets",
  async (gameId, { rejectWithValue }) => {
    try {
      // console.log("Fetching participants and bets for game:", gameId);

      const response = await client.query({
        query: GET_PARTICIPANTS_AND_BETS, // New merged query
        variables: { gameId },
        fetchPolicy: "network-only",
      });

      if (!response.data || !response.data.getParticipantsAndBets) {
        throw new Error("Invalid response from getParticipantsAndBets query");
      }

      return response.data.getParticipantsAndBets;
    } catch (error) {
      console.error("getParticipantsAndBets error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getRound = createAsyncThunk(
  "bets/getRound",
  async ({ gameId, walletAddress }, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_ROUND,
        variables: { gameId, walletAddress },
        fetchPolicy: "network-only", // Ensure fresh data
      });

      if (!data || !data.getRound) {
        throw new Error("Invalid response from getRound query");
      }

      return data.getRound;
    } catch (error) {
      console.error("getRound error:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const RoundUpdates = (gameId) => (dispatch) => {
  const subscription = client.subscribe({
    query: ROUND_UPDATED_SUBSCRIPTION,
    variables: { gameId },
  }).subscribe({
    next({ data }) {
      if (data?.roundUpdated) {
        console.log("✅ Round updated:", data.roundUpdated);
        dispatch(setRound(data.roundUpdated));

        // When a new round starts, reset the participants and bets
        dispatch(setParticipants(data.roundUpdated.participants || []));
        dispatch(setBets(data.roundUpdated.bets || []));
      }
    },
    error(error) {
      console.error("❌ Subscription error:", error);
      dispatch(setError(error.message));
    },
  });

  return () => {
    subscription.unsubscribe();
    console.log("🔴 Round subscription unsubscribed");
  };
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

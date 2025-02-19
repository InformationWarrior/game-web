// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useMutation } from "@apollo/client";
// import { PLACE_BET } from "../../../NetworkManager/graphql/Operations/mutations";
// import { subscribeToPlayerParticipation } from "../../../Config/redux/slices/betsSlice";

// function PlaceBet() {
//   const dispatch = useDispatch();
//   const [betPlaced, setBetPlaced] = useState(false);
//   const [placeBet, { loading: placingBet }] = useMutation(PLACE_BET);

//   const { betAmount, totalPlayerRounds, currency, gameState } = useSelector(
//     (state) => state.wheelSpin
//   );
//   const gameId = useSelector((state) => state.bets.gameId);
//   const walletAddress = useSelector(
//     (state) => state.bets.player?.walletAddress
//   );
//   const joiningGame = useSelector((state) => state.bets.networkStatus.loading); // Redux loading state

//   useEffect(() => {
//     if (gameState === "BETTING" && betPlaced) {
//       setBetPlaced(false);
//     }
//   }, [gameState]);

//   useEffect(() => {
//     if (gameId) {
//       dispatch(subscribeToPlayerParticipation(gameId));
//     }
//   }, [dispatch, gameId]);

//   // useEffect(() => {
//   //   if (gameId) {
//   //     dispatch(getParticipants(gameId));
//   //   }
//   // }, [gameId, dispatch]);

//   const handlePlaceBet = async () => {
//     try {
//       // ✅ Step 1: Mark player as a participant
//       const participantResponse = await dispatch(
//         subscribeToPlayerParticipation({ gameId, walletAddress })
//       ).unwrap(); // Unwrap to get the resolved response

//       console.log("✅ Player marked as participant:", participantResponse);

//       // ✅ Step 2: Proceed to place the bet only if participation was successful
//       const { data } = await placeBet({
//         variables: { betAmount, totalPlayerRounds, currency },
//       });

//       if (data.placeBet.success) {
//         console.log("✅ Bet placed successfully!");
//         setBetPlaced(true);
//       } else {
//         console.log(`❌ Error: ${data.placeBet.message}`);
//         setBetPlaced(false);
//       }
//     } catch (err) {
//       console.error("❌ Error:", err.message);
//     }
//   };

//   return (
//     <button
//       className="btn btn-primary w-100 rounded py-2"
//       onClick={handlePlaceBet}
//       disabled={
//         gameState !== "BETTING" || betPlaced || placingBet || joiningGame
//       }
//     >
//       {gameState !== "BETTING"
//         ? "Round Closed"
//         : betPlaced
//         ? "Bet Placed"
//         : placingBet || joiningGame
//         ? "Processing..."
//         : "Place Bet"}
//     </button>
//   );
// }

// export default PlaceBet;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useMutation } from "@apollo/client";
// import { PLACE_BET } from "../../../NetworkManager/graphql/Operations/mutations";
import {
  participateInGame,
  playerParticipated,
} from "../../../Config/redux/slices/betsSlice";

function PlaceBet() {
  const dispatch = useDispatch();
  const [betPlaced, setBetPlaced] = useState(false);
  // const [placeBet, { loading: placingBet }] = useMutation(PLACE_BET);

  const { gameState } = useSelector((state) => state.wheelSpin);
  const gameId = useSelector((state) => state.bets.gameId);
  const walletAddress = useSelector(
    (state) => state.bets.player?.walletAddress
  );
  const joiningGame = useSelector((state) => state.bets.networkStatus.loading);

  useEffect(() => {
    if (gameState === "BETTING" && betPlaced) {
      setBetPlaced(false);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameId) {
      dispatch(playerParticipated(gameId, walletAddress));
    }
  }, [dispatch, gameId]);

  // const handlePlaceBet = async () => {
  //   try {
  //     // ✅ Test Subscription Only - Remove Place Bet Logic
  //     console.log(
  //       "🔄 Testing subscription... Waiting for player participation."
  //     );

  //     // ✅ Dispatch subscription and log responses
  //     const participantResponse = await dispatch(
  //       subscribeToPlayerParticipation(gameId)
  //     ).unwrap(); // Unwrap to get the resolved response

  //     console.log(
  //       "✅ Player participation event received:",
  //       participantResponse
  //     );

  //     // ❌ Commented Out Place Bet Logic
  //     // const { data } = await placeBet({
  //     //   variables: { betAmount, totalPlayerRounds, currency },
  //     // });

  //     // if (data.placeBet.success) {
  //     //   console.log("✅ Bet placed successfully!");
  //     //   setBetPlaced(true);
  //     // } else {
  //     //   console.log(`❌ Error: ${data.placeBet.message}`);
  //     //   setBetPlaced(false);
  //     // }
  //   } catch (err) {
  //     console.error("❌ Subscription test error:", err.message);
  //   }
  // };

  // const handlePlaceBet = async () => {
  //   try {
  //     console.log(
  //       "🔄 Testing subscription... Waiting for player participation."
  //     );

  //     // ✅ Dispatch subscription without awaiting or unwrapping
  //     dispatch(playerParticipated(gameId));

  //     console.log("✅ Subscription initiated successfully!");
  //   } catch (err) {
  //     console.error("❌ Subscription test error:", err.message);
  //   }
  // };

  // const handlePlaceBet = async () => {
  //   try {
  //     console.log("🔄 Sending participateInGame mutation...");

  //     // ✅ Dispatch the mutation to mark the player as a participant
  //     await dispatch(participateInGame({ gameId, walletAddress })).unwrap();

  //     console.log("✅ Player participation mutation successful!");

  //     // ✅ Subscribe to participation updates
  //     dispatch(playerParticipated(gameId));

  //     console.log("✅ Subscription initiated successfully!");
  //   } catch (err) {
  //     console.error("❌ Error in participation flow:", err.message);
  //   }
  // };

  const handlePlaceBet = async () => {
    try {
      console.log("🔄 Sending participateInGame mutation...");

      // ✅ Dispatch the mutation to mark the player as a participant
      await dispatch(participateInGame({ gameId, walletAddress })).unwrap();

      console.log("✅ Player participation mutation successful!");
    } catch (err) {
      console.error("❌ Error in participation flow:", err.message);
    }
  };

  return (
    <button
      className="btn btn-primary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={gameState !== "BETTING" || betPlaced || joiningGame}
    >
      {gameState !== "BETTING"
        ? "Round Closed"
        : betPlaced
        ? "Bet Placed"
        : joiningGame
        ? "Processing..."
        : "Test Subscription"}
    </button>
  );
}

export default PlaceBet;

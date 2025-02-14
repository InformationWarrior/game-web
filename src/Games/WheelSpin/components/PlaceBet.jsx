import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { PLACE_BET } from "../../../NetworkManager/graphql/modules/WheelSpin/mutations";
import { participateInGame } from "../../../Config/redux/slices/betsSlice"; // Import Redux async thunk

function PlaceBet() {
  const dispatch = useDispatch();
  const [betPlaced, setBetPlaced] = useState(false);
  const [placeBet, { loading: placingBet }] = useMutation(PLACE_BET);

  // Extract gameId and walletAddress from Redux
  const { betAmount, totalPlayerRounds, currency, gameState } = useSelector(
    (state) => state.wheelSpin
  );
  const gameId = useSelector((state) => state.bets.currentGame?.id);
  const walletAddress = useSelector((state) => state.bets.wallet?.address);
  const joiningGame = useSelector((state) => state.bets.networkStatus.loading); // Redux loading state

  // Reset betPlaced when a new betting round starts
  useEffect(() => {
    if (gameState === "BETTING" && betPlaced) {
      setBetPlaced(false);
    }
  }, [gameState]);

  const handlePlaceBet = async () => {
    try {
      const { data } = await placeBet({
        variables: { betAmount, totalPlayerRounds, currency },
      });

      if (data.placeBet.success) {
        console.log("✅ Bet placed successfully!");
        setBetPlaced(true);

        // ✅ Now, mark the player as a participant via Redux
        dispatch(participateInGame({ gameId, walletAddress }));
      } else {
        console.log(`❌ Error: ${data.placeBet.message}`);
        setBetPlaced(false);
      }
    } catch (err) {
      console.error("❌ Error placing bet:", err.message);
    }
  };

  return (
    <button
      className="btn btn-secondary w-100 rounded py-2"
      onClick={handlePlaceBet}
      disabled={
        gameState !== "BETTING" || betPlaced || placingBet || joiningGame
      }
    >
      {gameState !== "BETTING"
        ? "Round Closed"
        : betPlaced
        ? "Bet Placed"
        : placingBet || joiningGame
        ? "Processing..."
        : "Place Bet"}
    </button>
  );
}

export default PlaceBet;

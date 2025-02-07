import React, { useState, useEffect } from "react";
import { gql, useSubscription } from "@apollo/client";

// GraphQL Subscription
const PLAYER_JOINED_SUBSCRIPTION = gql`
  subscription {
    playerJoined {
      player {
        _id
        name
      }
      playerCount
    }
  }
`;

const PlayerCount = ({ initialCount }) => {
  const [playerCount, setPlayerCount] = useState(initialCount || 0);

  // Subscription for real-time updates
  const { data: playerJoinedData } = useSubscription(
    PLAYER_JOINED_SUBSCRIPTION
  );

  useEffect(() => {
    if (playerJoinedData?.playerJoined) {
      console.log(
        `New player joined: ${playerJoinedData.playerJoined.name}`
      );
      setPlayerCount((prevCount) => prevCount + 1);
    }
  }, [playerJoinedData]);

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "10px",
      }}
    >
      <h3>Total Players: {playerCount}</h3>
    </div>
  );
};

export default PlayerCount;

import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import Player from "../components/Player";
import playerAvatar from "../assets/playerAvatar.png";
import styles from "../../../styles/WheelSpin/PlayersList.module.css";
// import { setParticipatedPlayers } from "../../../Config/redux/slices/betsSlice"; // Adjust the path as needed
import { setTotalPlayerRounds } from "../../../Config/redux/slices/wheelSpinSlice"; // Adjust path if needed

// GraphQL subscription
const PLAYER_JOINED_SUBSCRIPTION = gql`
  subscription PlayerJoined {
    playerJoined {
      walletAddress
      username
    }
  }
`;

const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    players {
      walletAddress
      username
    }
  }
`;

function PlayersListSection() {
  const dispatch = useDispatch();
  const borderColorClasses = [
    "border-green",
    "border-orange",
    "border-blue",
    "border-yellow",
    "border-red",
    "border-violet",
    "border-aqua",
  ];

  const getRandomBorderClass = () => {
    return borderColorClasses[
      Math.floor(Math.random() * borderColorClasses.length)
    ];
  };

  // State to store players
  const [players, setPlayers] = useState([]);
  const {
    loading: loadingPlayers,
    error: errorPlayers,
    data: playersData,
  } = useQuery(GET_ALL_PLAYERS);

  // Subscribe to playerJoined
  const { data, loading, error } = useSubscription(PLAYER_JOINED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newPlayer = subscriptionData.data.playerJoined;

      setPlayers(
        newPlayer.map((player) => ({
          avatar: playerAvatar,
          username: player.username,
          points: "0", // Default points for new players
          percentage: 0, // Default percentage for new players
          value: 0, // Default value for new players
          isWinner: false, // Default isWinner for new players
          borderColorClass: getRandomBorderClass(),
        }))
      );
    },
  });

  useEffect(() => {
    if (playersData) {
      const updatedPlayers = playersData.players.map((player) => ({
        avatar: playerAvatar,
        username: player.username,
        points: "0",
        percentage: 0,
        value: 0,
        isWinner: false,
        borderColorClass: getRandomBorderClass(),
      }));

      setPlayers(updatedPlayers);
      dispatch(setTotalPlayerRounds(updatedPlayers.length)); // Update Redux state
      // dispatch(setParticipatedPlayers(updatedPlayers));
    }
  }, [playersData, dispatch]);

  useEffect(() => {
    if (playersData) {
      setPlayers(
        playersData.players.map((player) => ({
          avatar: playerAvatar,
          username: player.username,
          points: "0", // Default points for new players
          percentage: 0, // Default percentage for new players
          value: 0, // Default value for new players
          isWinner: false, // Default isWinner for new players
          borderColorClass: getRandomBorderClass(),
        }))
      );
    }
  }, []);

  useEffect(() => {
    console.log("playersData :::::", playersData);

    if (playersData) {
      setPlayers(
        playersData.players.map((player) => ({
          avatar: playerAvatar,
          username: player.username,
          points: "0", // Default points for new players
          percentage: 0, // Default percentage for new players
          value: 0, // Default value for new players
          isWinner: false, // Default isWinner for new players
          borderColorClass: getRandomBorderClass(),
        }))
      );
    }
  }, [playersData]);

  if (loading && players.length === 0) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={styles["players-list-content"]}>
      {/* Header */}
      <div className={styles["players-list-header"]}>
        <p className={styles["players-list-header-text"]}>
          {players.length} Players
        </p>
      </div>

      {/* Body */}
      <div className={styles["players-list-body"]}>
        {players.map((player, index) => (
          <Player key={index} {...player} />
        ))}
      </div>
    </div>
  );
}

export default PlayersListSection;

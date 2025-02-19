import { gql } from "@apollo/client";

export const GET_ENTERED_PLAYERS = gql`
  query GetEnteredPlayers($gameId: ID!) {
    getEnteredPlayers(gameId: $gameId) {
      walletAddress
      username
      profileImage
    }
  }
`;

export const GET_PARTICIPANTS = gql`
  query GetParticipants($gameId: ID!) {
    getParticipants(gameId: $gameId) {
      walletAddress
      username
      profileImage
    }
  }
`;


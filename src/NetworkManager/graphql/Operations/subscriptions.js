import { gql } from "@apollo/client";

export const GAME_STATUS_SUBSCRIPTION = gql`
  subscription {
    gameStatusUpdated {
      gameState
      remainingTime
    }
  }
`;

export const PLAYER_PARTICIPATED_SUBSCRIPTION = gql`
  subscription PlayerParticipated($gameId: ID!, $walletAddress: String!) {
    playerParticipated(gameId: $gameId, walletAddress: $walletAddress) {
      gameId
      walletAddress
      game {
        id
        participants {
          walletAddress
          username
          profileImage
        }
      }
    }
  }
`;
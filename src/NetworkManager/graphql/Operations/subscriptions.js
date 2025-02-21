import { gql } from "@apollo/client";

export const GAME_STATUS_SUBSCRIPTION = gql`
  subscription {
    gameStatusUpdated {
      gameState
      remainingTime
    }
  }
`;

export const PLAYER_ENTERED_SUBSCRIPTION = gql`
  subscription PlayerEntered($gameId: ID!, $walletAddress: String!) {
    playerEntered(gameId: $gameId, walletAddress: $walletAddress) {
      gameId
      walletAddress
      game {
        id
        enteredPlayers {
          walletAddress
          username
          profileImage
        }
      }
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

export const BET_PLACED_SUBSCRIPTION = gql`
  subscription BetPlaced($gameId: ID!, $walletAddress: String!) {
    betPlaced(gameId: $gameId, walletAddress: $walletAddress) {
      gameId
      walletAddress
      amount
      currency
      totalPlayerRounds
      game {
        id
        name
        type
        state
        totalBetsAmount
        participants {
          walletAddress
          username
          balance
        }
      }
    }
  }
`;

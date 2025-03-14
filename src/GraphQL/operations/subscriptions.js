import { gql } from "@apollo/client";

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

export const GAME_STATUS_SUBSCRIPTION = gql`
  subscription GameStatusUpdated{
    gameStatusUpdated {
      gameState
      remainingTime
    }
  }
`;

export const ROUND_UPDATED_SUBSCRIPTION = gql`
  subscription roundUpdated($gameId: ID!) {
    roundUpdated(gameId: $gameId) {
      _id
      gameId
      roundNumber
      totalBetAmount
      participants {
        walletAddress
        username
        color
        betAmount
        currency
        winningChance
      }
      bets {
        id
        game
        player {
          walletAddress
          username
          color
        }
        amount
        currency
        betOption
        usdEquivalent
        exchangeRate
        transactionHash
        timestamp
        multiBet
        strategy
      }
      winner {
        walletAddress
        username
      }
      startedAt
    }
  }
`;

export const WINNER_DETERMINED_SUBSCRIPTION = gql`
  subscription WinnerDetermined($gameId: ID!) {
    winnerDetermined(gameId: $gameId) {
      gameId
      roundNumber
      winner {
        _id
        username
        walletAddress
      }
    }
  }
`;
import { gql } from "@apollo/client";

export const GET_ENTERED_PLAYERS = gql`
  query GetEnteredPlayers($gameId: ID!) {
    getEnteredPlayers(gameId: $gameId) {
      gameId  
      walletAddress
      username
    }
  }
`;

export const GET_PARTICIPANTS_AND_BETS = gql`
query GetParticipantsAndBets($gameId: ID!) {
  getParticipantsAndBets(gameId: $gameId) {
    participants {
      walletAddress
      username
      betAmount
      currency
    }
    bets {
      id
      game
      amount
      currency
      player {
        walletAddress
        username
      }
      betOption
      usdEquivalent
      exchangeRate
      transactionHash
      timestamp
      multiBet
      strategy
    }
  }
}
`;

export const GET_ALL_GAMES = gql`
  query GetAllGames {
    getAllGames {
      _id
      name
      type
      state
      maxPlayers
      maxParticipants
      totalBetsAmount
    }
  }
`

export const GET_BET_HISTORY_BY_WALLET = gql`
  query GetBetHistoryByWallet($walletAddress: String!) {
    getBetHistoryByWallet(walletAddress: $walletAddress) {
      amount
      username
      winAmount
    }
  }
`;

export const GET_ROUND = gql`
  query GetRound($gameId: ID!, $walletAddress: String!) {
  getRound(gameId: $gameId, walletAddress: $walletAddress) {
    _id
    gameId
    roundNumber
    totalBetAmount
    winningChance
    participants {
      walletAddress
      username
      betAmount
      currency
    }
    bets {
      id
      game
      player {
        walletAddress
        username
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
    startedAt
  }
}
`;
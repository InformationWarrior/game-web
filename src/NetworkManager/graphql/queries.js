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
  query getParticipants($gameId: ID!) {
    getParticipants(gameId: $gameId) {
      walletAddress
      username
      betAmount
      currency
    }
  }
`;


export const GET_BETS = gql`
  query getBets($gameId: ID!) {
  getBets(gameId: $gameId) {
    player {
      walletAddress
    }
    amount
    currency
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

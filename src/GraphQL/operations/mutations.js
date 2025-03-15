import { gql } from '@apollo/client';

// ✅ Mutation to create a player
export const CREATE_PLAYER = gql`
  mutation CreatePlayer(
  $walletAddress: String!
  $username: String!
  $balance: Float!
  $currency: String!
) {
  createPlayer(
    walletAddress: $walletAddress
    username: $username
    balance: $balance
    currency: $currency
  ) {
    success
    message
    player {
      walletAddress
      username
      balance
    }
  }
}
`;

// ✅ Mutation to enter a game (just enter, not necessarily play)
export const ENTER_GAME = gql`
  mutation EnterGame($gameId: ID!, $walletAddress: String!) {
    enterGame(gameId: $gameId, walletAddress: $walletAddress) {
      gameId
      walletAddress
      username
    }
  }
`;

export const LEAVE_GAME = gql`
  mutation LeaveGame($gameId: ID!, $walletAddress: String!) {
    leaveGame(gameId: $gameId, walletAddress: $walletAddress) {
      id
      name
      type
      state
      enteredPlayers {
        walletAddress
        username
      }
      participants {
        walletAddress
        username
      }
      spectators {
        walletAddress
        username
      }
      maxPlayers
      maxParticipants
    }
  }
`;

export const PLACE_BET_AND_PARTICIPATE = gql`
  mutation PlaceBetAndParticipate($gameId: ID!, $walletAddress: String!, $betAmount: Float!, $currency: String!) {
    placeBetAndParticipate(gameId: $gameId, walletAddress: $walletAddress, betAmount: $betAmount, currency: $currency) {
      participants {
        walletAddress
        username
        color
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
          color
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

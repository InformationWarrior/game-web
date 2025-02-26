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

// ✅ Mutation to create a game
export const CREATE_GAME = gql`
  mutation CreateGame($name: String!, $type: String!, $maxPlayers: Int!, $maxParticipants: Int!) {
    createGame(name: $name, type: $type, maxPlayers: $maxPlayers, maxParticipants: $maxParticipants) {
      id
      name
      type
      state
      maxPlayers
      maxParticipants
      enteredPlayers {
        walletAddress
        username
      }
      participants {
        walletAddress
        username
      }
    }
  }
`;

// ✅ Mutation to enter a game (just enter, not necessarily play)
export const ENTER_GAME = gql`
  mutation EnterGame($gameId: ID!, $walletAddress: String!) {
    enterGame(gameId: $gameId, walletAddress: $walletAddress) {
      _id
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
    }
  }
`;

// ✅ Mutation to confirm participation (player actually plays)
export const PARTICIPATE_IN_GAME = gql`
  mutation ParticipateInGame($gameId: ID!, $walletAddress: String!) {
    participateInGame(gameId: $gameId, walletAddress: $walletAddress) {
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
    }
  }
`;


export const PLACE_BET_AND_PARTICIPATE = gql`
  mutation placeBetAndParticipate($gameId: ID!, $walletAddress: String!, $betAmount: Float!, $currency: String!) {
    placeBetAndParticipate(gameId: $gameId, walletAddress: $walletAddress, betAmount: $betAmount, currency: $currency) {
      walletAddress
      username
      betAmount
      currency
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

// export const PLACE_BET = gql`
//   mutation PlaceBet(
//     $gameId: ID!
//     $walletAddress: String!
//     $betAmount: Float!
//     $totalPlayerRounds: Int!
//     $currency: String!
//   ) {
//     placeBet(
//       gameId: $gameId
//       walletAddress: $walletAddress
//       amount: $betAmount
//       totalPlayerRounds: $totalPlayerRounds
//       currency: $currency
//     ) {
//       gameId
//       walletAddress
//       amount
//       currency
//       totalPlayerRounds
//       game {
//         id
//         name
//         participants {
//           walletAddress
//           username
//           balance
//         }
//       }
//     }
//   }
// `;


export const REMOVE_PARTICIPANTS = gql`
  mutation removeParticipants($gameId: ID!) {
    removeParticipants(gameId: $gameId) {
      success
      message
    }
  }
`;

export const REMOVE_BETS = gql`
  mutation removeBets($gameId: ID!) {
    removeBets(gameId: $gameId) {
      success
      message
    }
  }
`;

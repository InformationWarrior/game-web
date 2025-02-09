import { gql } from '@apollo/client';

// ✅ Mutation to create a player
export const CREATE_PLAYER = gql`
  mutation CreatePlayer($walletAddress: ID!, $username: String!) {
    createPlayer(walletAddress: $walletAddress, username: $username) {
      walletAddress
      username
    }
  }
`;

// ✅ Mutation to create a game
export const CREATE_GAME = gql`
    mutation CreateGame($name: String!, $type: String!, $maxPlayers: Int!) {
        createGame(name: $name, type: $type, maxPlayers: $maxPlayers) {
            id
            name
            type
            state
            maxPlayers
            players {
                walletAddress
                username
            }
        }
    }
`;

// ✅ Mutation to join a game
export const JOIN_GAME = gql`
  mutation JoinGame($gameId: ID!, $walletAddress: ID!) {
    joinGame(gameId: $gameId, walletAddress: $walletAddress) {
      id
      name
      type
      state
      players {
        walletAddress
        username
      }
    }
  }
`;

export const SAVE_WALLET_DATA = gql`
  mutation SaveWalletData($address: String!, $balance: Float!, $currency: String!) {
    saveWalletData(address: $address, balance: $balance, currency: $currency) {
      success
      message
    }
  }
`;

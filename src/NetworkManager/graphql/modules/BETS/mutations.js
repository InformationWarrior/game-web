import { gql } from '@apollo/client';

// ✅ Mutation to create a player
export const CREATE_PLAYER = gql`
  mutation CreatePlayer($walletAddress: String!, $username: String!) {
    createPlayer(walletAddress: $walletAddress, username: $username) {
      walletAddress
      username
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


// ✅ Mutation to save wallet data
export const SAVE_WALLET_DATA = gql`
  mutation SaveWalletData($address: String!, $balance: Float!, $currency: String!) {
    saveWalletData(address: $address, balance: $balance, currency: $currency) {
      success
      message
    }
  }
`;

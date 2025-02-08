import { gql } from '@apollo/client';

export const CREATE_GAME = gql`
  mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      players {
        _id
        name
      }
    }
  }
`;

export const JOIN_GAME = gql`
  mutation JoinGame($gameId: ObjectId!, $name: String!) {
    joinGame(gameId: $gameId, name: $name) {
      _id
      players {
        _id
        name
      }
    }
  }
`;

export const MAKE_MOVE = gql`
  mutation MakeMove($gameId: ObjectId!, $move: String!) {
    makeMove(gameId: $gameId, move: $move) {
      _id
      moves {
        playerId
        move
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

import { gql } from '@apollo/client';

export const PLAYER_JOINED_SUBSCRIPTION = gql`
  subscription {
    playerJoined {
      player {
        _id
        name
      }
      playerCount
    }
  }
`;

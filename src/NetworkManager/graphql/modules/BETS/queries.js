import { gql } from '@apollo/client';

export const GET_GAME = gql`
  query GetGame($_id: ObjectId!) {
    game(_id: $_id) {
      _id
      players {
        _id
        name
      }
      moves {
        playerId
        move
      }
    }
  }
`;

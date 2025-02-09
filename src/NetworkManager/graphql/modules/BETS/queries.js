import { gql } from '@apollo/client';

// ✅ Query to get all games
export const GET_GAMES = gql`
    query GetGames {
        games {
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

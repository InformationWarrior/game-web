import { gql } from "@apollo/client";

export const GAME_STATUS_SUBSCRIPTION = gql`
  subscription {
    gameStatusUpdated {
      state
      remainingTime
    }
  }
`;

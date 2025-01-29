import { gql } from "@apollo/client";

export const PLACE_BET = gql`
  mutation PlaceBet(
    $betAmount: Float!
    $totalPlayerRounds: Int!
    $currency: String!
  ) {
    placeBet(
      betAmount: $betAmount
      totalPlayerRounds: $totalPlayerRounds
      currency: $currency
    ) {
      success
      message
    }
  }
`;
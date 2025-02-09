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


// Will use later

// import { useMutation, useSubscription } from '@apollo/client';

// const PLACE_BET_MUTATION = gql`
//   mutation PlaceBet($address: String!, $betAmount: Float!, $totalPlayerRounds: Int!) {
//     placeBet(address: $address, betAmount: $betAmount, totalPlayerRounds: $totalPlayerRounds) {
//       success
//       message
//       wallet {
//         address
//         balance
//         currency
//       }
//     }
//   }
// `;

// const WALLET_UPDATED_SUBSCRIPTION = gql`
//   subscription WalletUpdated($address: String!) {
//     walletUpdated(address: $address) {
//       address
//       balance
//       currency
//     }
//   }
// `;

// // Execute the mutation
// const [placeBet] = useMutation(PLACE_BET_MUTATION);
// placeBet({ variables: { address, betAmount, totalPlayerRounds } });

// // Subscribe to wallet updates
// useSubscription(WALLET_UPDATED_SUBSCRIPTION, {
//   variables: { address },
//   onSubscriptionData: ({ subscriptionData }) => {
//     const updatedWallet = subscriptionData.data.walletUpdated;
//     // Update the client-side state with the new wallet balance
//   },
// });

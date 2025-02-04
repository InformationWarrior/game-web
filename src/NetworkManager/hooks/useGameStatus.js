import { gql, useSubscription } from '@apollo/client';

const GAME_STATUS_SUBSCRIPTION = gql`
  subscription GameStatusUpdated {
    gameStatusUpdated {
      state
      remainingTime
    }
  }
`;

export const useGameStatus = () => {
  const { data, loading, error } = useSubscription(GAME_STATUS_SUBSCRIPTION);

  return { gameStatus: data?.gameStatusUpdated, loading, error };
};

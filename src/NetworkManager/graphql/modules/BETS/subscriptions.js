import { gql } from '@apollo/client';

// ✅ Subscription to listen for new players joining a game
export const PLAYER_JOINED = gql`
    subscription PlayerJoined {
        playerJoined {
            walletAddress
            username
        }
    }
`;
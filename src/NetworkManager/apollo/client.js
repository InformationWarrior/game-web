import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

// ✅ HTTP connection setup (for Queries & Mutations)
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
})

// ✅ WebSocket connection setup (for Subscriptions)
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: 'ws://localhost:5000/graphql',
//     on: {
//       connected: () => console.log('✅ WebSocket Connected!'),
//       closed: event => console.log(`❌ WebSocket Closed: ${event.code}`),
//       error: err => console.error('❌ WebSocket Error:', err)
//     }
//   })
// )

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true
  }
  // on: {
  //   connected: () => console.log('✅ WebSocket Connected!'),
  //   closed: event => console.log(`❌ WebSocket Closed: ${event.code}`),
  //   error: err => console.error('❌ WebSocket Error:', err)
  // }
})

// ✅ Split link: Directs queries/mutations to HTTP and subscriptions to WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink, // Subscriptions → WebSocket
  httpLink // Queries & Mutations → HTTP
)

// ✅ Apollo Client Setup
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export default client

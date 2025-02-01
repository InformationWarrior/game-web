import React, { useState, useEffect } from 'react';
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  gql,
  useQuery,
  useMutation
} from '@apollo/client';
import { io } from 'socket.io-client';

// Define GraphQL queries, mutations, and subscriptions
const CREATE_GAME = gql`
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

const JOIN_GAME = gql`
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

const MAKE_MOVE = gql`
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

const GET_GAME = gql`
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

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function Client() {
  const [game, setGame] = useState(null);
  const [move, setMove] = useState('');
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);

  const { data: gameData } = useQuery(GET_GAME, { variables: { id: game?.id } });

  const [createGame] = useMutation(CREATE_GAME);
  const [joinGame] = useMutation(JOIN_GAME);
  const [makeMove] = useMutation(MAKE_MOVE);

  useEffect(() => {
    const socketConnection = io('http://localhost:5000');
    setSocket(socketConnection);

    socketConnection.on('playerJoined', (player) => {
      console.log(`Player joined: ${player.name}`);
      console.log("game :::::", game);
      
      if (game) {
        setGame(prevGame => ({
          ...prevGame,
          players: [...prevGame.players, player],
        }));
      }
    });

    socketConnection.on('moveMade', (updatedGame) => {
      console.log('Move made:', updatedGame);
      setGame(updatedGame);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, [game]);

  const handleJoinGame = async () => {
    const { data } = await joinGame({ variables: { gameId, name } });
    console.log(JSON.stringify(data));
    
    setGame(data.joinGame);
  };

  const handleCreateGame = async () => {
    const { data } = await createGame({ variables: { name } });
    setGame(data.createGame);
  };

  const handleMakeMove = async () => {
    if (move && game) {
      await makeMove({ variables: { gameId: game.id, move } });
      setMove('');
    }
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Game</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter game Id"
        />
        <button onClick={handleJoinGame}>Join Game</button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={handleCreateGame}>Create Game</button>

        {game && (
          <div>
            <h2>Game ID: {game.id}</h2>
            <h3>Players:</h3>
            <ul>
              {game?.players?.length > 0 && game.players.map(player => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>

            <h3>Moves:</h3>
            <ul>
              {game?.moves?.length > 0 && game.moves.map((move, index) => (
                <li key={index}>{move.playerId}: {move.move}</li>
              ))}
            </ul>

            <input
              type="text"
              value={move}
              onChange={(e) => setMove(e.target.value)}
              placeholder="Make a move"
            />
            <button onClick={handleMakeMove}>Make Move</button>
          </div>
        )}
      </div>
    </ApolloProvider>
  );
}

export default Client;
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GAME, CREATE_GAME, JOIN_GAME, MAKE_MOVE } from "../../graphql";
import { useSocket } from "../hooks/useSocket";
import PlayerList from "./components/PlayerList";
import MoveList from "./components/MoveList";
import MoveInput from "./components/MoveInput";

const Game = () => {
  const [game, setGame] = useState(null);
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const socket = useSocket("http://localhost:5000");

  const { data: gameData } = useQuery(GET_GAME, {
    variables: { _id: game?.id },
    skip: !game?.id,
  });

  const [createGame] = useMutation(CREATE_GAME);
  const [joinGame] = useMutation(JOIN_GAME);
  const [makeMove] = useMutation(MAKE_MOVE);

  const handleCreateGame = async () => {
    const { data } = await createGame({ variables: { name } });
    setGame(data.createGame);
  };

  const handleJoinGame = async () => {
    const { data } = await joinGame({ variables: { gameId, name } });
    setGame(data.joinGame);
  };

  const handleMakeMove = async (move) => {
    if (game) {
      await makeMove({ variables: { gameId: game._id, move } });
    }
  };

  return (
    <div>
      <h1>Game</h1>
      {!game ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <button onClick={handleCreateGame}>Create Game</button>
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter game Id"
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>Game ID: {game._id}</h2>
          <PlayerList players={game.players} />
          <MoveList moves={game.moves} />
          <MoveInput onMove={handleMakeMove} />
        </div>
      )}
    </div>
  );
};

export default Game;

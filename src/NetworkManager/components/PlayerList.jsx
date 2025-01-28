const PlayerList = ({ players }) => (
    <ul>
      {players.map((player) => (
        <li key={player._id}>{player.name}</li>
      ))}
    </ul>
  );
  export default PlayerList;
  
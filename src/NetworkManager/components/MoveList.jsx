const MoveList = ({ moves }) => (
    <ul>
      {moves.map((move, index) => (
        <li key={index}>
          {move.playerId}: {move.move}
        </li>
      ))}
    </ul>
  );
  export default MoveList;
  
import { useState } from 'react';

const MoveInput = ({ onMove }) => {
  const [move, setMove] = useState('');
  const handleMove = () => {
    onMove(move);
    setMove('');
  };

  return (
    <div>
      <input
        type="text"
        value={move}
        onChange={(e) => setMove(e.target.value)}
        placeholder="Make a move"
      />
      <button onClick={handleMove}>Make Move</button>
    </div>
  );
};

export default MoveInput;

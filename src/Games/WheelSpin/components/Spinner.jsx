import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useSelector, useDispatch } from "react-redux";
import {
  setInGameMessage,
  clearMessage,
} from "../../../Common/redux/slices/wheelSpinSlice";

const players = [
  { name: "Alice", betAmount: 0.5 },
  { name: "Bob", betAmount: 0.3 },
  { name: "Charlie", betAmount: 0.2 },
  { name: "Adam", betAmount: 0.2 },
  { name: "Nick", betAmount: 0.5 },
];

function Spinner() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.wheelSpin.gameState);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const totalBetAmount = players.reduce(
    (sum, player) => sum + player.betAmount,
    0
  );
  const data = players.map((player, index) => ({
    option: `${player.name} (${(
      (player.betAmount / totalBetAmount) *
      100
    ).toFixed(1)}%)`,
    name: player.name,
    style: {
      backgroundColor: generateUniqueColor(index),
      textColor: "white",
    },
  }));

  function generateUniqueColor(index) {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F7FF33", "#FF33A8"];
    return colors[index % colors.length];
  }

  useEffect(() => {
    if (gameState === "SPINNING") {
      handleSpinStart();
    }
  }, [gameState]);

  const handleSpinStart = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinComplete = () => {
    console.log(`The spinner landed on: ${data[prizeNumber].option}`);
    dispatch(setInGameMessage(`The winner is ${data[prizeNumber].name}`));
    setMustSpin(false); // Reset spinning state after completion
    // Trigger additional actions if needed
  };

  return (
    <div className="wheel-container d-flex flex-column align-items-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleSpinComplete}
        outerBorderWidth={5}
        innerBorderWidth={0}
        radiusLineWidth={1}
      />
    </div>
  );
}

export default Spinner;

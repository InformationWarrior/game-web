import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useSelector, useDispatch } from "react-redux";
import {
  setInGameMessage,
  clearMessage,
} from "../../../Config/redux/slices/wheelSpinSlice";
import "../styles/Wheel.css";

const players = [
  { name: "Alice", betAmount: 10, optionSize: 0 },
  { name: "Bob", betAmount: 20, optionSize: 0 },
  { name: "Charlie", betAmount: 20, optionSize: 0 },
  { name: "Adam", betAmount: 150, optionSize: 0 },
  { name: "Nick", betAmount: 20, optionSize: 0 },
];

// Calculate the total betAmount
const totalBetAmount = players.reduce(
  (total, player) => total + player.betAmount,
  0
);

// Update optionSize based on the ratio of betAmount to totalBetAmount
players.forEach((player) => {
  player.optionSize = parseFloat(
    (player.betAmount / totalBetAmount) * players.length
  ).toFixed(2);
});

// Round optionSize to make it more readable(optional)
players.forEach((player) => {
  player.optionSize = Math.round(player.optionSize);
});

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
    optionSize: parseInt((player.betAmount / totalBetAmount) * 100),
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
    <div className="wheel-container d-flex flex-column">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        spinDuration={0}
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

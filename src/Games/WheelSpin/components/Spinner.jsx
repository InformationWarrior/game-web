import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white" }, textColor: "black" },
  { option: "2", style: { backgroundColor: "blue", textColor: "white" } },
];

function Spinner() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length); // Random prize
    setPrizeNumber(newPrizeNumber); // Set where the wheel stops
    setMustSpin(true); // Start spinning
  };

  const handleSpinComplete = () => {
    setMustSpin(false); // Reset spinning state after spin stops
  };

  return (
    <div className="wheel-container d-flex flex-column align-items-center">
      <button
        onClick={handleSpinClick}
        className="btn btn-primary mt-4"
        disabled={mustSpin}
      >
        Spin the Wheel
      </button>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleSpinComplete}
      />
    </div>
  );
}

export default Spinner;

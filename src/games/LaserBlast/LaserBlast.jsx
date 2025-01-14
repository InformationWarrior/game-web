import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import GameDataTable from "./components/GameDataTable";
import BetOptions from "./components/BetOptions";
import { UIManager } from "./scripts/UIManager";
import { ScoreManager } from "./scripts/ScoreManager";
import ResponsiveCanvas from "./components/ResponsiveCanvas";
import dynamicConstants from "./scripts/dynamicConstants";
import "./styles/LaserBlast.css";

function LaserBlast() {
  const { riskLevel, numberOfRows } = useSelector((state) => state.laserBlast);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("YOLO");
  const [currentBetIndex, setCurrentBetIndex] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [overallTotalWin, setOverallTotalWin] = useState(0); // Track overall total win
  const [currentCredits, setCurrentCredits] = useState(1000); // Initialize with 1000 credits
  const [currentMultiplier, setCurrentMultiplier] = useState(null);

  const canvasRef = useRef(null);
  const scoreManagerRef = useRef(null);
  const [uIManager, setUIManager] = useState(null);

  useEffect(() => {
    const manager = new ScoreManager();
    scoreManagerRef.current = manager;
    setCurrentCredits(manager.credits);
  }, []);

  useEffect(() => {
    if (canvasRef.current && scoreManagerRef.current) {
      const manager = new UIManager(
        canvasRef.current,
        numberOfRows,
        riskLevel,
        (index) => {
          const multiplier = manager.getLatestMultiplier();
          setCurrentMultiplier(multiplier);
          console.log(
            "Multiplier after ball finish: >>>>>>>>>>>>>>",
            multiplier
          );

          const roundWin =
            scoreManagerRef.current.calculateTotalWin(multiplier);
          setTotalWin(roundWin); // Set current round win

          // Update the overall total win
          setOverallTotalWin((prevTotal) => prevTotal + roundWin);
        },
        scoreManagerRef,
        setTotalWin,
        setOverallTotalWin
      );
      setUIManager(manager);
    }

    return () => {
      if (uIManager) {
        uIManager.stop(); // Cleanup on component unmount
      }
    };
  }, [canvasRef, numberOfRows, riskLevel]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setDropdownOpen(false);
  };

  const handleDropBall = (point) => {
    if (uIManager && point) {
      uIManager.addBall(point);
    }
  };

  // const handleDropBall = async () => {
  //   try {
  //     if (uIManager && scoreManagerRef.current) {
  //       if (
  //         scoreManagerRef.current.credits >= scoreManagerRef.current.currentBet
  //       ) {
  //         scoreManagerRef.current.placeBet();
  //         setCurrentCredits(scoreManagerRef.current.credits);

  //         uIManager.addBall(outcomes[9][5]);
  //       } else {
  //         console.log("Insufficient credits to place the bet.");
  //         alert(
  //           "You do not have enough credits to play. Please add more credits or reduce the bet amount."
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error handling play:", error);
  //   }
  // };

  const handleLeftClick = () => {
    if (currentBetIndex > 0) {
      const newIndex = currentBetIndex - 1;
      setCurrentBetIndex(newIndex);
      scoreManagerRef.current.setBet(
        scoreManagerRef.current.betArray[newIndex]
      );
    }
  };

  const handleRightClick = () => {
    if (currentBetIndex < scoreManagerRef.current.betArray.length - 1) {
      const newIndex = currentBetIndex + 1;
      setCurrentBetIndex(newIndex);
      scoreManagerRef.current.setBet(
        scoreManagerRef.current.betArray[newIndex]
      );
    }
  };

  const handleCanvasResize = ({ width, height }) => {
    dynamicConstants.updateDimensions({ width, height });
  };

  return (
    <div className="laser-blast">
      <div className="laser-blast__main">
        {/* Game Panel */}
        <div className="laser-blast__game">
          <div className="laser-blast__panel">
            <div className="laser-blast__canvas">
              <ResponsiveCanvas
                canvasRef={canvasRef}
                onDimensionsChange={handleCanvasResize}
              />
            </div>
          </div>
        </div>

        <div className="laser-blast__bet-options">
          <BetOptions
            handleDropBall={handleDropBall}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            handleCurrencyChange={handleCurrencyChange}
            currentBet={scoreManagerRef.current?.betArray[currentBetIndex]}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
            currentCredits={currentCredits} // Display current credits
            currentMultiplier={currentMultiplier}
            totalWin={totalWin} // Display current round win
            overallTotalWin={overallTotalWin} // Display overall total win
          />
        </div>
      </div>

      <div className="laser-blast__data">
        <GameDataTable />
      </div>
    </div>
  );
}

export default LaserBlast;

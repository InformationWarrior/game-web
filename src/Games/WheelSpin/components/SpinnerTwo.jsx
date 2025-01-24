import React from 'react';
import { SpinWheel } from 'spin-wheel-game';

const MySpinWheel = () => {
  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
    // Handle the result as needed
  };

  // Example bet amounts for each option
  const bets = [
    { segmentText: 'Option 1', betAmount: 10, segColor: 'red' },
    { segmentText: 'Option 2', betAmount: 0.20, segColor: 'blue' },
    { segmentText: 'Option 3', betAmount: 50, segColor: 'green' },
    { segmentText: 'Option 4', betAmount: 150, segColor: 'yellow' },
    { segmentText: 'Option 5', betAmount: 500, segColor: 'pink' },
  ];

  // Calculate the total bet amount
  const totalBetAmount = bets.reduce((total, bet) => total + bet.betAmount, 0);

  // Calculate segment share percentages
  const segments = bets.map((bet) => ({
    segmentText: bet.segmentText,
    segColor: bet.segColor,
    sharePercentage: (bet.betAmount / totalBetAmount) * 100, // for reference
  }));

  return (
    <SpinWheel
      segments={segments.map(({ segmentText, segColor }) => ({
        segmentText,
        segColor,
      }))}
      onFinished={handleSpinFinish}
      primaryColor="black"
      contrastColor="white"
      buttonText="Spin"
      isOnlyOnce={false}
      size={290}
      upDuration={100}
      downDuration={600}
      fontFamily="Arial"
      arrowLocation="top"
      showTextOnSpin={true}
      isSpinSound={true}
    />
  );
};

export default MySpinWheel;

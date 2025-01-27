import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts"; // Use recharts for the pie chart
import { Button } from "@mui/material";

export default function BasicPie() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Define the prizes and colors
  const segments = ["Prize 1", "Prize 2", "Prize 3"];
  const colors = ["#02B2AF", "#2E96FF", "#B800D8"]; // Teal, Blue, Purple

  // Set different percentage values for each pie slice
  const data = [
    { name: "Prize 1", value: 25, fill: "#02B2AF" },
    { name: "Prize 2", value: 40, fill: "#2E96FF" },
    { name: "Prize 3", value: 35, fill: "#B800D8" },
  ];

  const segmentAngle = 360;

  // Spin the wheel function
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = Math.floor(Math.random() * 3 + 5); // Random spins between 5 and 7
    const randomAngle = Math.random() * segmentAngle;
    const totalRotation = spins * 360 + randomAngle;

    setRotation((prev) => prev + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const selectedSegment =
        Math.floor(((totalRotation % 360) + segmentAngle / 2) / segmentAngle) %
        segments.length;
      alert(`You won: ${segments[selectedSegment]}`);
    }, 4000); // Matches animation duration
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <motion.div
        className="wheel"
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          //border: "3px solid yellow",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="0"
            outerRadius="150"
            startAngle={90} // Start angle to match your design
            endAngle={-270} // End angle to complete the circle
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            wrapperStyle={{
              fontSize: "14px",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "#fff",
              borderRadius: "5px",
              padding: "10px",
            }}
            contentStyle={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
            }}
            itemStyle={{
              color: "#000",
            }}
          />
        </PieChart>
      </motion.div>

      <Button
        variant="contained"
        onClick={spinWheel}
        disabled={isSpinning}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>
    </div>
  );
}





// import React, { useEffect, useRef, useState } from "react";
// import { BallManager } from "../game/classes/BallManager";
// import axios from "axios";
// import { Button } from "../components/ui";
// import { baseURL } from "../utils";

// const GameManager = () => {
//   const [ballManager, setBallManager] = useState(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       const manager = new BallManager(canvasRef.current);
//       setBallManager(manager);
//     }
//   }, []);

//   const addBall = async () => {
//     try {
//       const response = await axios.post(`${baseURL}/game`, { data: 1 });
//       if (ballManager) {
//         ballManager.addBall(response.data.point);
//       }
//     } catch (error) {
//       console.error("Error adding ball:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-center">
//       <canvas ref={canvasRef} width="800" height="800"></canvas>
//       <Button className="px-10 mb-4" onClick={addBall}>
//         Add Ball
//       </Button>
//     </div>
//   );
// };

// export default GameManager;

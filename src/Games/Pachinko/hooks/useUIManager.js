import { useEffect, useState } from "react";
import { UIManager } from "../scripts/UIManager";

export const useUIManager = (canvasRef, numberOfRows, riskLevel) => {
  const [uIManager, setUIManager] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const manager = new UIManager(canvasRef.current, numberOfRows, riskLevel);
      setUIManager(manager);
    }

    return () => {
      if (uIManager) {
        uIManager.stop();
      }
    };
  }, [canvasRef, numberOfRows, riskLevel]);

  return uIManager;
};

import React, { useEffect } from "react";

function ResponsiveCanvas({ canvasRef, onDimensionsChange }) {
  const canvasAspectRatio = 4 / 3;

  const maxWidth = 800;
  const maxHeight = 600;

  const minWidth = 300;
  const minHeight = 225;

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;

      const windowWidth = window.innerWidth;

      let newHeight = windowWidth / canvasAspectRatio;
      let newWidth = Math.min(windowWidth, maxWidth);
      newHeight = Math.min(newHeight, maxHeight);
      newWidth = Math.max(newWidth, minWidth);
      newHeight = Math.max(newHeight, minHeight);

      canvasRef.current.style.width = `${newWidth}px`;
      canvasRef.current.style.height = `${newHeight}px`;

      if (onDimensionsChange) {
        onDimensionsChange({ width: newWidth, height: newHeight });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvasRef, onDimensionsChange]);

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
    </div>
  );
}

export default ResponsiveCanvas;

import { pad } from "./padding";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

export const createPegs = (rows) => {
    const pegs = [];
    const pegsRadius = 8 - ((rows - 8) * 0.5);

    const baseRowSpacing = 50;
    const rowSpacing = baseRowSpacing - ((rows - 8) * 2);

    let yPos = 0;
    let lastRowXPositions = [];

    for (let row = 2; row < rows + 2; row++) {
        const numPegs = row + 1;
        yPos = row * rowSpacing;

        const currentRowXPositions = [];
        for (let col = 0; col < numPegs; col++) {
            const xPos = CANVAS_WIDTH / 2 - rowSpacing * (row / 2 - col);
            pegs.push({ x: pad(xPos), y: pad(yPos), radius: pegsRadius });
            currentRowXPositions.push(pad(xPos));
        }

        // If this is the last row, store its xPos values excluding the last peg
        if (row === rows + 1) {
            lastRowXPositions = currentRowXPositions.slice(0, -1); // Exclude the last peg
        }
    }

    return { pegs, pegsRadius, lastRowYPos: yPos, spacing: rowSpacing, lastRowXPositions };
};

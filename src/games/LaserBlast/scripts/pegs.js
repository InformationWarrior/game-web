import { pad } from "./padding";
import { CANVAS_WIDTH } from "./constants";


export const createPegs = (rows) => {
    const pegs = [];
    const pegsRadius = 8 - ((rows - 8) * 0.5);
    const baseSpacing = 50;
    const spacing = baseSpacing - ((rows - 8) * 2);
    let yPos = 0;
    let lastRowXPositions = [];

    for (let row = 2; row < rows + 2; row++) {
        const numPegs = row + 1;
        yPos = row * spacing;

        const currentRowXPositions = [];
        for (let col = 0; col < numPegs; col++) {
            const xPos = CANVAS_WIDTH / 2 - spacing * (row / 2 - col);
            pegs.push({ x: pad(xPos), y: pad(yPos), radius: pegsRadius });
            currentRowXPositions.push(pad(xPos));
        }

        // If this is the last row, store its xPos values excluding the last peg
        if (row === rows + 1) {
            lastRowXPositions = currentRowXPositions.slice(0, -1); // Exclude the last peg
        }
    }

    return { pegs, pegsRadius, lastRowYPos: yPos, spacing, lastRowXPositions };
};


// const createSinkshelper = (rows, pegsRadius, lastRowYPos, rowSpacing) => {
//     const sinks = [];
//     const SPACING = pegsRadius * 2;

//     for (let i = 0; i <= rows; i++) {
//         const x = CANVAS_WIDTH / 2 + sinkWidth * (i - Math.floor((rows + 1) / 2)) - SPACING * 1.5;
//         const y = lastRowYPos + rowSpacing;
//         const width = 36;
//         const height = 36;
//         sinks.push({ x, y, width, height });
//     }
//     return sinks;
// }

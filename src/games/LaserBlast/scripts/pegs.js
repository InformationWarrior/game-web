import { WIDTH, pegsRadius } from "./constants";
import { pad } from "./padding";

export const createPegs = (rows) => {
    const pegs = [];

    for (let row = 2; row < rows + 2; row++) {
        const numPegs = row + 1;
        const y = 0 + row * 35;
        const spacing = 36;

        for (let col = 0; col < numPegs; col++) {
            const x = WIDTH / 2 - spacing * (row / 2 - col);
            pegs.push({ x: pad(x), y: pad(y), radius: pegsRadius });
        }
    }

    return pegs;
};
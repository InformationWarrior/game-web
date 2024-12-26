import { HEIGHT, WIDTH, pegsRadius, sinkWidth } from "./constants";
import { sinkMultiplierData } from './sinkData';

const getMultipliers = (row, risk) => {
    if (!risk || !row) {
        return [];
    }

    if (!sinkMultiplierData[risk]) {
        console.error(`Invalid risk level: ${risk}`);
        return [];
    }

    const riskData = sinkMultiplierData[risk];
    const multiplierArr = riskData[String(row)];

    if (!multiplierArr) {
        console.error(`No multipliers found for risk: ${risk} and row: ${row}`);
        return [];
    }

    return multiplierArr;
};

export const createSinks = (rows, risk) => {
    const sinks = [];
    const SPACING = pegsRadius * 2;
    const MULTIPLIERS = getMultipliers(rows, risk);

    for (let i = 0; i <= rows; i++) {
        const x = WIDTH / 2 + sinkWidth * (i - Math.floor((rows + 1) / 2)) - SPACING * 1.5;
        const y = HEIGHT - 170;
        const width = sinkWidth;
        const height = width;
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i] });
    }

    return sinks;
};
import { sinkMultiplierData } from './sinkData';
import { unpad } from "./padding";

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

export const createSinks = (rows, risk, pegsRadius, lastRowYPos, rowSpacing, lastRowXPositions) => {
    const sinks = [];
    const MULTIPLIERS = getMultipliers(rows, risk);
    const y = lastRowYPos + rowSpacing / 2;
    // const y = CANVAS_HEIGHT - 25;

    for (let i = 0; i <= rows; i++) {
        const x = unpad(lastRowXPositions[i]) + pegsRadius;
        const height = 25;
        const width = rowSpacing - pegsRadius;
        sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i] });
    }
    return sinks;
};
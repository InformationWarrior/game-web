import { pad } from "./padding";
import dynamicConstants from "./dynamicConstants";

export const CANVAS_WIDTH = dynamicConstants.canvasWidth;
export const CANVAS_HEIGHT = dynamicConstants.canvasHeight;

export const ballRadius = 7;
export const pegsRadius = 4;

export const gravity = pad(0.6);
export const horizontalFriction = 0.4;
export const verticalFriction = 0.8;

export const sinkWidth = 36;


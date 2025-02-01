import { CANVAS_HEIGHT, CANVAS_WIDTH, ballRadius, pegsRadius, sinkWidth } from "./constants";
import { createSinks } from "./sinks";
import { createPegs } from './pegs';
import { pad, unpad } from "./padding";
import { Ball } from "./Ball";


export class UIManager {
    constructor(canvas, row, risk, onFinishCallback) {
        this.balls = [];
        this.canvasRef = canvas;
        this.ctx = this.canvasRef.getContext("2d");
        const { pegs, pegsRadius, lastRowYPos, spacing, lastRowXPositions } = createPegs(row);
        this.pegs = pegs;
        this.sinks = createSinks(row, risk, pegsRadius, lastRowYPos, spacing, lastRowXPositions);
        this.update();
        this.canvas = canvas;
        this.row = row;
        this.risk = risk;
        this.onFinishCallback = onFinishCallback;
    }

    updateRows(newRows) {
        this.pegs = createPegs(newRows);
    }

    updateSinks(newRows, newRisk) {
        this.sinks = createSinks(newRows, newRisk);
    }

    addBall(startX, payout, onFinishCallback) {
        const newBall = new Ball(
            startX || pad(CANVAS_WIDTH / 2 + 13),
            pad(50),
            ballRadius,
            "red",
            this.ctx,
            this.pegs,
            this.sinks,
            (index) => {
                this.balls = this.balls.filter((ball) => ball !== newBall);
                if (onFinishCallback) {
                    onFinishCallback(index, startX, payout);
                }
            }
        );
        this.balls.push(newBall);
    }


    drawPegs() {
        this.ctx.fillStyle = 'white';
        this.pegs.forEach((peg) => {
            this.ctx.beginPath();
            this.ctx.arc(unpad(peg.x), unpad(peg.y), peg.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    drawSinks() {
        const SPACING = pegsRadius * 2;
        for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i];
            const colorInfo = this.getColor(i);
            this.ctx.fillStyle = colorInfo.background;

            // this.ctx.fillRect(sink.x, sink.y, sink.width, sink.height);
            this.ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - SPACING, sink.height);
            this.ctx.fillStyle = colorInfo.color;
            this.ctx.font = 'normal 8px Arial';
            this.ctx.fillText(
                (sink.multiplier || '').toString() + "x",
                sink.x - 15 + sinkWidth / 2,
                sink.y
            );
        }
    }

    getColor(index) {
        if (index < 3 || index > this.sinks.length - 3) {
            return { background: '#ff003f', color: 'white' };
        }
        if (index < 6 || index > this.sinks.length - 6) {
            return { background: '#ff7f00', color: 'white' };
        }
        if (index < 9 || index > this.sinks.length - 9) {
            return { background: '#ffbf00', color: 'black' };
        }
        if (index < 12 || index > this.sinks.length - 12) {
            return { background: '#ffff00', color: 'black' };
        }
        if (index < 15 || index > this.sinks.length - 15) {
            return { background: '#bfff00', color: 'black' };
        }
        return { background: '#7fff00', color: 'black' };
    }


    draw() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.drawPegs();
        this.drawSinks();
        this.balls.forEach((ball) => {
            ball.draw();
            ball.update();
        });
    }

    update() {
        this.draw();
        this.requestId = requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    }
    onFinish(index) {
        if (this.onFinishCallback) {
            this.onFinishCallback(index);
        }
    }
}

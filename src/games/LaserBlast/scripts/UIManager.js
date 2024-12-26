import { HEIGHT, WIDTH, ballRadius, pegsRadius, sinkWidth } from "./constants";
import { createSinks } from "./sinks";
import { createPegs } from './pegs';
import { pad, unpad } from "./padding";
import { Ball } from "./Ball";

export class UIManager {
    constructor(canvasRef, rows, risk, onFinish) {
        this.balls = [];
        this.canvasRef = canvasRef;
        this.ctx = this.canvasRef.getContext("2d");
        this.pegs = createPegs(rows);
        this.sinks = createSinks(rows, risk);
        this.update();
        this.onFinish = onFinish;
    }

    updateRows(newRows) {
        this.pegs = createPegs(newRows);
    }

    updateSinks(newRows, newRisk) {
        this.sinks = createSinks(newRows, newRisk);
    }

    addBall(startX) {
        const newBall = new Ball(
            startX || pad(WIDTH / 2 + 13),
            pad(50),
            ballRadius,
            'red',
            this.ctx,
            this.pegs,
            this.sinks,
            (index) => {
                this.balls = this.balls.filter((ball) => ball !== newBall);
                if (this.onFinish) {
                    this.onFinish(index, startX);
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

    drawSinks() {
        const SPACING = pegsRadius * 2;
        for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i];
            const colorInfo = this.getColor(i);
            this.ctx.fillStyle = colorInfo.background;

            this.ctx.fillRect(sink.x, sink.y - sink.height / 2, sink.width - SPACING, sink.height);
            this.ctx.fillStyle = colorInfo.color;
            this.ctx.font = 'normal 13px Arial';
            this.ctx.fillText(
                (sink.multiplier || '').toString() + "x",
                sink.x - 15 + sinkWidth / 2,
                sink.y
            );
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
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
}

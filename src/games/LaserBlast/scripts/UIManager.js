import { CANVAS_HEIGHT, CANVAS_WIDTH, ballRadius, pegsRadius, sinkWidth } from "./constants";
import { createSinks } from "./sinks";
import { createPegs } from './pegs';
import { pad, unpad } from "./padding";
import { Ball } from "./Ball";


export class UIManager {
    constructor(canvas, row, risk, onFinishCallback, scoreManagerRef, setTotalWin, setOverallTotalWin) {
        this.balls = [];
        this.canvasRef = canvas;
        this.ctx = this.canvasRef.getContext("2d");
        const { pegs, pegsRadius, lastRowYPos, spacing, lastRowXPositions } = createPegs(row);
        this.pegs = pegs;
        this.sinks = createSinks(row, risk, pegsRadius, lastRowYPos, spacing, lastRowXPositions);
        this.update();
        this.latestMultiplier = 0; // Store the latest multiplier
        this.canvas = canvas;
        this.row = row;
        this.risk = risk;
        this.onFinishCallback = onFinishCallback; // Passed from LaserBlast
        this.scoreManagerRef = scoreManagerRef; // Passed from LaserBlast
        this.setTotalWin = setTotalWin; // Passed from LaserBlast
        this.setOverallTotalWin = setOverallTotalWin; // Passed from LaserBlast
    }

    updateRows(newRows) {
        this.pegs = createPegs(newRows);
    }

    updateSinks(newRows, newRisk) {
        this.sinks = createSinks(newRows, newRisk);
    }

    addBall(startX) {
        const newBall = new Ball(
            startX || pad(CANVAS_WIDTH / 2 + 13),
            pad(50),
            ballRadius,
            'red',
            this.ctx,
            this.pegs,
            this.sinks,
            (index) => {
                this.balls = this.balls.filter((ball) => ball !== newBall);
                if (this.onFinishCallback) {
                    this.onFinishCallback(index, startX);
                }
                // Update the latest multiplier when the ball enters a sink
                this.latestMultiplier = newBall.getMultiplier();
            }
        );
        this.balls.push(newBall);
    }

    getLatestMultiplier() {
        return this.latestMultiplier;
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
            this.ctx.font = 'normal 11px Arial';
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

    // On ball finish, update the total win and overall win
    onFinish(index) {
        const multiplier = this.getLatestMultiplier();
        console.log("Multiplier after ball finish: >>>>>>>>>>>>>>", multiplier);

        if (this.scoreManagerRef && this.scoreManagerRef.current) {
            // Calculate total win
            const roundWin = this.scoreManagerRef.current.calculateTotalWin(multiplier);
            this.setTotalWin(roundWin); // Set current win for this round

            // Update the overall total win
            this.setOverallTotalWin((prevTotal) => prevTotal + roundWin);
        } else {
            console.error("ScoreManager is not initialized yet!");
        }

        // Call the callback function passed from LaserBlast
        if (this.onFinishCallback) {
            this.onFinishCallback(index);
        }
    }
}

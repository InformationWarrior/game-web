import { gravity, horizontalFriction, verticalFriction } from "./constants";
import { pad, unpad } from "./padding";

export class Ball {
    constructor(x, y, radius, color, ctx, obstacles, sinks, onFinish) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.ctx = ctx;
        this.obstacles = obstacles; // Array of obstacles
        this.sinks = sinks; // Array of sinks
        this.onFinish = onFinish; // Callback function when the ball enters a sink
        this.multiplier = 0; // Store multiplier for use in other scripts or components
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        // Apply gravity
        this.vy += gravity;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Handle collision with obstacles
        this.obstacles.forEach((obstacle) => {
            const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
            if (dist < pad(this.radius + obstacle.radius)) {
                // Calculate collision angle
                const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
                // Reflect velocity
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                this.vx = Math.cos(angle) * speed * horizontalFriction;
                this.vy = Math.sin(angle) * speed * verticalFriction;

                // Adjust position to prevent sticking
                const overlap = this.radius + obstacle.radius - unpad(dist);
                this.x += pad(Math.cos(angle) * overlap);
                this.y += pad(Math.sin(angle) * overlap);
            }
        });

        // Handle collision with sinks
        for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i];
            let condition = unpad(this.x) > sink.x - sink.width / 2 &&
                unpad(this.x) < sink.x + sink.width / 2 &&
                unpad(this.y) + this.radius > sink.y - sink.height / 2

            if (condition) {
                this.vx = 0;
                this.vy = 0;
                // console.log("This is my current Multiplier >>>>  ", sink);

                // Store the multiplier from the sink
                this.multiplier = sink.multiplier;

                // Trigger the callback when the ball enters a sink
                this.onFinish(i);
                break;
            }
        }
    }

    // Method to get the multiplier for use in other components
    getMultiplier() {
        return this.multiplier;
    }
}

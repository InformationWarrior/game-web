// Initialize game state
let bins = [0, 0, 0, 0, 0]; // Track balls in each bin
let ballCount = 0;

// Setup Plinko pegs
const board = document.querySelector('.plinko-board');
const pegCount = 10; // Number of rows of pegs

// Create pegs
function createPegs() {
    for (let row = 0; row < pegCount; row++) {
        const offsetX = (row % 2 === 0) ? 0 : 50; // Alternate column placement for the pegs
        for (let col = 0; col < pegCount - row; col++) {
            const peg = document.createElement('div');
            peg.classList.add('peg');
            peg.style.top = `${row * 40 + 20}px`;
            peg.style.left = `${col * 40 + offsetX}px`;
            board.appendChild(peg);
        }
    }
}

// Start a new ball drop
function dropBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.top = '0px';
    ball.style.left = `${Math.random() * 380}px`; // Start at a random position at the top

    board.appendChild(ball);

    // Ball falling animation
    setTimeout(() => {
        let ballLeft = parseFloat(ball.style.left);
        let ballTop = 0;
        let direction = 1;

        const dropInterval = setInterval(() => {
            ballTop += 10;
            ball.style.top = `${ballTop}px`;

            if (ballTop % 40 === 0) { // Every time the ball hits a peg level
                ballLeft += direction * 10; // Move the ball left or right
                ball.style.left = `${ballLeft}px`;

                // Change direction when the ball hits a peg on left/right
                direction = (Math.random() > 0.5) ? 1 : -1;
            }

            if (ballTop >= 380) {
                clearInterval(dropInterval);
                // Determine the bin the ball lands in
                const binIndex = Math.floor(ballLeft / 80);
                bins[binIndex]++;
                document.getElementById(`bin${binIndex + 1}`).textContent = bins[binIndex];
                ball.remove(); // Remove the ball from the board
            }
        }, 50);
    }, 100);
}

// Start button handler
document.getElementById('startButton').addEventListener('click', () => {
    dropBall();
});

// Initialize pegs when the page loads
createPegs();

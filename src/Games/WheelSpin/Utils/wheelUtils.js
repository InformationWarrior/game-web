import confetti from "canvas-confetti";

export const drawWheel = (canvas, rotation, participants) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / participants.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(rotation * (Math.PI / 180));

    participants.forEach((participant, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = (i + 1) * sliceAngle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = participant.color;
        ctx.fill();
        ctx.stroke();
    });

    // Draw Inner Circle (Center)
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.65, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.restore();
};

export const spinWheel = (rotation, setRotation, setSpinning, participants, determineWinner) => {
    if (participants.length === 0 || setSpinning === true) return;

    setSpinning(true);
    let spinTime = 3000;
    let startRotation = rotation;
    let finalRotation = startRotation + 720 + Math.random() * 360;
    let startTime = null;

    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / spinTime;
        let easeProgress = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
        let currentRotation =
            startRotation + (finalRotation - startRotation) * easeProgress;

        setRotation(currentRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setSpinning(false);
            determineWinner(currentRotation, participants);
        }
    };

    requestAnimationFrame(animate);
};

export const determineWinner = (finalRotation, participants, setWinner, setShowWinner) => {
    if (participants.length === 0) return;

    const sliceAngle = 360 / participants.length;
    const winningIndex = Math.floor(
        ((360 - (finalRotation % 360)) / sliceAngle) % participants.length
    );

    const winnerName = participants[winningIndex]?.name;
    setWinner(winnerName);
    setShowWinner(true);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.7 },
    });

    setTimeout(() => setShowWinner(false), 5000);
};

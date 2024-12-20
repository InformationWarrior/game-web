import LaserBlastGame from "../games/LaserBlast/LaserBlastGame";
import laserBlastLogo from "../games/LaserBlast/assets/thumbnail.webp";

const gamesConfig = [
    {
        "title": "Laser Blast",
        "description": "Invaders must die!",
        "type": "Single Player",
        "path": "/laser-blast",
        "imgSrc": laserBlastLogo,
        "element": <LaserBlastGame />
    },
];

export default gamesConfig;
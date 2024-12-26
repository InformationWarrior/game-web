import LaserBlast from "../games/LaserBlast/LaserBlast";
import laserBlastLogo from "../games/LaserBlast/assets/thumbnail.webp";

const gamesConfig = [
    {
        "title": "Laser Blast",
        "description": "Invaders must die!",
        "type": "Single Player",
        "path": "/laser-blast",
        "imgSrc": laserBlastLogo,
        "element": <LaserBlast />
    },
];

export default gamesConfig;
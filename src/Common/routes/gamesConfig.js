import LaserBlast from "../../Games/Pachinko/LaserBlast";
import laserBlastLogo from "../../Games/Pachinko/assets/thumbnail.webp";

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
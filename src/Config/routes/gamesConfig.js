import PocketPachinko from "../../Games/Pachinko/PocketPachinko";
import pocketPachinkoLogo from "../../Games/Pachinko/assets/thumbnail.webp";

import WheelSpin from "../../Games/WheelSpin/WheelSpin";
import wheelSpinLogo from "../../Games/WheelSpin/assets/SpinWheelBanner.webp";

const gamesConfig = [
    // {
    //     "title": "Pocket Pachinko",
    //     // "description": "Invaders must die!",
    //     "type": "Single Player",
    //     "path": "/pocket-pachinko",
    //     "imgSrc": pocketPachinkoLogo,
    //     "element": <PocketPachinko />
    // },
    {
        "title": "Wheel Spin",
        "description": "Spin the Wheel!",
        "type": "Multi Player",
        "path": "/wheel-spin",
        "imgSrc": wheelSpinLogo,
        "element": <WheelSpin />
    },
];

export default gamesConfig;
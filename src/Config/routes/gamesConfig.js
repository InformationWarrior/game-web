import PocketPachinko from "../../Games/Pachinko/PocketPachinko";
import pocketPachinkoLogo from "../../Games/Pachinko/assets/thumbnail.webp";

import WheelSpin from "../../Games/WheelSpin/WheelSpin";
import wheelSpinLogo from "../../Games/WheelSpin/assets/SpinWheelBanner.webp";

const gamesConfig = [
    // {
    //     "title": "Pocket Pachinko",
    //     "description": "Invaders must die!",
    //     "type": "Single Player",
    //     "path": "/pocket-pachinko",
    //     "imgSrc": pocketPachinkoLogo,
    //     "element": <PocketPachinko />
    // },
    {
        id: "67a89cf55a020728c5b4d746", // Temporary ID until backend provides actual ID
        title: "Wheel Spin",
        description: "Spin the Wheel!",
        type: "Multi Player",
        path: "/wheel-spin",
        imgSrc: wheelSpinLogo,
        element: <WheelSpin />
    },
];

export default gamesConfig;
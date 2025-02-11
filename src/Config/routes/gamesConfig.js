import PocketPachinko from "../../Games/Pachinko/PocketPachinko";
import pocketPachinkoLogo from "../../Games/Pachinko/assets/thumbnail.webp";

import WheelSpin from "../../Games/WheelSpin/WheelSpin";
import wheelSpinLogo from "../../Games/WheelSpin/assets/SpinWheelBanner.webp";

const gamesConfig = [
    // {
    //     "title": "Pocket Pachinko",
    //     "description": "Invaders must die!",
    //     "type": "single",
    //     "path": "/pocket-pachinko",
    //     "imgSrc": pocketPachinkoLogo,
    //     "element": <PocketPachinko />
    // },
    {
        id: "67aaf6b6c3530ef6836151e2", // Temporary ID until backend provides actual ID
        title: "Wheel Spin",
        description: "Spin the Wheel!",
        type: "multiplayer",
        path: "/wheel-spin",
        imgSrc: wheelSpinLogo,
        element: <WheelSpin />
    },
];

export default gamesConfig;
import WheelSpin from "../../WheelSpin/WheelSpin";
import wheelSpinLogo from "../../WheelSpin/assets/SpinWheelBanner.webp";

const gamesConfig = [
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
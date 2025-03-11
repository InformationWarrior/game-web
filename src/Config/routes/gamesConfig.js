import WheelSpin from '../../Games/WheelSpin/WheelSpin'
import wheelSpinLogo from '../../Games/WheelSpin/assets/SpinWheelBanner.webp'
const GAME_ID = process.env.GAME_ID;

const gamesConfig = [
  {
    id: "67c7c5786a43f19451f8dcd9", // Temporary ID until backend provides actual ID
    title: 'Wheel Spin',
    description: 'Spin the Wheel!',
    type: 'multiplayer',
    path: '/wheel-spin',
    imgSrc: wheelSpinLogo,
    element: <WheelSpin />
  }
]

export default gamesConfig

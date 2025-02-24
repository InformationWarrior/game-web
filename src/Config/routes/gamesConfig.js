import WheelSpin from '../../Games/WheelSpin/WheelSpin'
import wheelSpinLogo from '../../Games/WheelSpin/assets/SpinWheelBanner.webp'
const GAME_ID = process.env.GAME_ID;

const gamesConfig = [
  {
    id: "67bc7e7d1a130ea6b96d5b61", // Temporary ID until backend provides actual ID
    title: 'Wheel Spin',
    description: 'Spin the Wheel!',
    type: 'multiplayer',
    path: '/wheel-spin',
    imgSrc: wheelSpinLogo,
    element: <WheelSpin />
  }
]

export default gamesConfig

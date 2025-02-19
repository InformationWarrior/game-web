import WheelSpin from '../../Games/WheelSpin/WheelSpin'
import wheelSpinLogo from '../../Games/WheelSpin/assets/SpinWheelBanner.webp'

const gamesConfig = [
  {
    id: '67b42091dad8e320e611a165', // Temporary ID until backend provides actual ID
    title: 'Wheel Spin',
    description: 'Spin the Wheel!',
    type: 'multiplayer',
    path: '/wheel-spin',
    imgSrc: wheelSpinLogo,
    element: <WheelSpin />
  }
]

export default gamesConfig

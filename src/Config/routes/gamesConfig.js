import WheelSpin from '../../Games/WheelSpin/WheelSpin'
import wheelSpinLogo from '../../Games/WheelSpin/assets/SpinWheelBanner.webp'

const gamesConfig = [
  {
    id: '67ab8f01d7f39d41a761fc67', // Temporary ID until backend provides actual ID
    title: 'Wheel Spin',
    description: 'Spin the Wheel!',
    type: 'multiplayer',
    path: '/wheel-spin',
    imgSrc: wheelSpinLogo,
    element: <WheelSpin />
  }
]

export default gamesConfig

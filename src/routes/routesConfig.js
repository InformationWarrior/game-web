import Home from "../pages/Home";
import Rewards from "../pages/Rewards";
import ContactUs from '../pages/ContactUs'

const routesConfig = [
  {
    "label": "Home",
    "title": "YOLO Games | The Home of Degen Gaming",
    "path": "/",
    "icon": "🏠",
    "element": <Home />
  },
  {
    "label": "Games",
    "icon": "🎮",
  },
  {
    "label": "Rewards",
    "title": "Rewards",
    "path": "/rewards",
    "icon": "🏆",
    "element": <Rewards />
  },

  {
    "label": "Contact Us",
    "title": "Contact Us",
    "path": "/contact-us",
    "icon": "✉️",
    "element": <ContactUs />
  },

  // {
  //   "label": "Rakeback",
  //   "title": "Rakeback",
  //   "path": "/rakeback",
  //   "icon": "📥"
  // },
  // {
  //   "label": "Lottery",
  //   "title": "Lottery",
  //   "path": "/lottery",
  //   "icon": "🎟️"
  // },
  // {
  //   "label": "Gold Rush",
  //   "title": "Gold Rush",
  //   "path": "/gold-rush",
  //   "icon": "💰"
  // },
  // {
  //   "label": "Liquidity",
  //   "title": "Liquidity",
  //   "path": "/liquidity",
  //   "icon": "💧"
  // },
  // {
  //   "label": "Settings",
  //   "title": "Settings",
  //   "path": "/settings",
  //   "icon": "⚙️"
  // }
]
  ;

export default routesConfig;

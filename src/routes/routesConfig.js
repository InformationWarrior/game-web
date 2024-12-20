import Home from "../pages/Home";
import Rewards from "../pages/Rewards";

const routesConfig = [
  {
    "label": "Home",
    "title": "Title of the Webpage",
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

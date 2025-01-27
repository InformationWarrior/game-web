import Home from "../../BETS/pages/Home";
import Games from "../../BETS/pages/Games";
import Rewards from "../../BETS/pages/Rewards";
import ContactUs from "../../BETS/pages/ContactUs";

import { FaHome, FaGamepad, FaTrophy, FaRegAddressCard } from "react-icons/fa";

const routesConfig = [
  {
    "label": "Home",
    "title": "BETS",
    "path": "/",
    "icon": <FaHome />,
    "element": <Home />
  },
  {
    "label": "Games",
    "title": "BETS",
    "path": "/games",
    "icon": <FaGamepad />,
    "element": <Games />
  },
  {
    "label": "Rewards",
    "title": "Rewards",
    "path": "/rewards",
    "icon": <FaTrophy />,
    "element": <Rewards />
  },

  {
    "label": "Contact Us",
    "title": "Contact Us",
    "path": "/contact-us",
    "icon": <FaRegAddressCard />,
    "element": <ContactUs />
  },
];

export default routesConfig;

import { Link } from "react-router-dom";
import routesConfig from "../routes/routesConfig";
import "../styles/Sidebar.css";
import Logo from "./Logo";

function Sidebar({ showGamesPanel, setShowGamesPanel }) {
  return (
    <div>
      <Logo />
      <div className="buttons">
        <ul className="nav-links">
          {routesConfig.map((route, index) => (
            <li
              key={index}
              onClick={(e) => {
                if (route.label === "Games") {
                  e.preventDefault(); // Prevent default link navigation
                  setShowGamesPanel(!showGamesPanel);
                } else if (showGamesPanel) {
                  setShowGamesPanel(false); // Close GamesPanel for other buttons
                }
              }}
              onMouseEnter={() => {
                if (route.label === "Games") {
                  if (!showGamesPanel) setShowGamesPanel(true);
                } else if (showGamesPanel) {
                  setShowGamesPanel(false); // Close GamesPanel for other buttons
                }
              }}
            >
              <Link to={route.path} className="nav-link">
                <span className="icon">{route.icon}</span>
                <span className="label">{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

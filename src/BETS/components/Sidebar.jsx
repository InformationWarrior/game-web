import { Link } from "react-router-dom";
import routesConfig from "../../Config/routes/routesConfig";
import "../styles/Sidebar.css";
import Logo from "./Logo";

// function Sidebar({ showGamesPanel, setShowGamesPanel }) {
function Sidebar() {
  // const toggleGamesPanel = () => {
  //   setShowGamesPanel(!showGamesPanel);
  // };

  // const openGamesPanel = () => {
  //   setShowGamesPanel(true);
  // };

  // const closeGamesPanel = () => {
  //   setShowGamesPanel(false);
  // };

  // const handleClick = (route, event) => {
  //   if (route.label === "Games") {
  //     event.preventDefault();
  //     toggleGamesPanel();
  //   } else {
  //     closeGamesPanel();
  //   }
  // };

  // const handleMouseEnter = (route) => {
  //   if (route.label === "Games" && showGamesPanel) {
  //     openGamesPanel();
  //   } else {
  //     closeGamesPanel();
  //   }
  // };

  // const handleMouseLeave = (route) => {
  //   if (route.label === "Games" && !showGamesPanel) {
  //     closeGamesPanel();
  //   }
  // };

  return (
    <div>
      <Logo />
      <div className="buttons">
        <ul className="nav-links">
          {routesConfig.map((route, index) => (
            <li
              key={index}
              // onClick={(event) => handleClick(route, event)}
              // onMouseEnter={() => handleMouseEnter(route)}
              // onMouseLeave={() => handleMouseLeave(route)}
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

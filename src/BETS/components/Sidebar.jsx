import { Link, NavLink } from "react-router-dom";
import routesConfig from "../../Common/routes/routesConfig";
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
            >
              <NavLink
                to={route.path}
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                activeClassName="active" // This will add the 'active' class when the link is active
              >
                <span className="icon">{route.icon}</span>
                <span className="label">{route.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

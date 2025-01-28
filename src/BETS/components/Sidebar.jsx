import { Link } from "react-router-dom";
import routesConfig from "../../Config/routes/routesConfig";
import "../styles/Sidebar.css";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div>
      <Logo />
      <div className="buttons">
        <ul className="nav-links">
          {routesConfig.map((route, index) => (
            <li key={index}>
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

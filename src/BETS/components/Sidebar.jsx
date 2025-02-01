import { NavLink } from "react-router-dom";
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
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                activeClassName="active"
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

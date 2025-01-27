import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import routesConfig from "../../Config/routes/routesConfig";
import "../styles/SidebarPanel.css";

function SidebarPanel({ onClose }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="sidebar-panel" ref={sidebarRef}>
      {/* Logo Section */}
      <header className="sidebar-panel-header">
        <h1 className="logo">BETS</h1>
      </header>

      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          {routesConfig.map(({ path, label, icon }) => (
            <li key={path}>
              <Link to={path} className="nav-link" onClick={onClose}>
                <span className="icon">{icon}</span> {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SidebarPanel;

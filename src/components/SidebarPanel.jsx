import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaGamepad,
  FaTrophy,
  FaTicketAlt,
  FaDollarSign,
  FaCogs,
  //   FaQuestionCircle,
  //   FaDiscord,
  FaTimes,
} from "react-icons/fa";

import "../styles/SidebarPanel.css";

function SidebarPanel({ onClose }) {
  const sidebarRef = useRef(null);

  // Close sidebar on outside click
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
      <div className="sidebar-panel-header">
        <h1 className="logo">
          YOLO <span className="logo-highlight">GAMES</span>
        </h1>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link" onClick={onClose}>
            <FaHome className="icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/games" className="nav-link" onClick={onClose}>
            <FaGamepad className="icon" />
            Games
          </Link>
        </li>
        <li>
          <Link to="/rewards" className="nav-link" onClick={onClose}>
            <FaTrophy className="icon" />
            Rewards
          </Link>
        </li>
        <li>
          <Link to="/rakeback" className="nav-link" onClick={onClose}>
            <FaTicketAlt className="icon" />
            Rakeback
          </Link>
        </li>
        <li>
          <Link to="/lottery" className="nav-link" onClick={onClose}>
            <FaDollarSign className="icon" />
            Lottery
          </Link>
        </li>
        <li>
          <Link to="/goldrush" className="nav-link" onClick={onClose}>
            <FaDollarSign className="icon" />
            Gold Rush
          </Link>
        </li>
        <li>
          <Link to="/liquidity" className="nav-link" onClick={onClose}>
            <FaDollarSign className="icon" />
            Liquidity
          </Link>
        </li>
        <li>
          <Link to="/settings" className="nav-link" onClick={onClose}>
            <FaCogs className="icon" />
            Settings
          </Link>
        </li>
      </ul>

      {/* Footer Section */}
      {/* <div className="sidebar-footer">
        <Link to="/docs" className="footer-link" onClick={onClose}>
          <FaQuestionCircle className="icon" />
          Docs
        </Link>
        <div className="footer-icons">
          <button className="footer-icon" onClick={onClose}>
            <FaTimes />
          </button>
          <button className="footer-icon">
            <FaDiscord />
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default SidebarPanel;

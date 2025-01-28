import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarPanel from "./SidebarPanel";
import NavbarTitle from "./NavbarTitle";
import "../styles/Navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="nav-bar">
      <div className="navbar-left">
        <button
          className="hamburger-button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <span className="navbar-logo">BETS</span>
      </div>
      <NavbarTitle className="navbar-title" title={props.title || "BETS"} />
      <div className="navbar-buttons">
        <ConnectButton />
      </div>

      {isSidebarOpen && (
        <SidebarPanel onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}

export default Navbar;

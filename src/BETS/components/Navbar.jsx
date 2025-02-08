import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarPanel from "./SidebarPanel";
import "../styles/Navbar.css";
import CustomConnectButton from "./CustomConnectButton";

function Navbar() {
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
      </div>
      <div className="navbar-buttons">
        <CustomConnectButton />
      </div>

      {isSidebarOpen && (
        <SidebarPanel onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}

export default Navbar;

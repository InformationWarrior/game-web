import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarPanel from "./SidebarPanel";
import NavbarTitle from "./NavbarTitle";
import InvitePanel from "./InvitePanel";
import "../styles/Navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInvitePanelOpen, setIsInvitePanelOpen] = useState(false);

  return (
    <div className="nav-bar">
      <div className="navbar-left">
        <button
          className="hamburger-button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
        <span className="navbar-logo">Y</span>
      </div>
      <NavbarTitle className="navbar-title" title={props.title} />
      <div className="navbar-buttons">
        <button
          className="invite-button me-2"
          onClick={() => setIsInvitePanelOpen(true)}
        >
          Invite
        </button>
        <ConnectButton />
      </div>

      {isSidebarOpen && (
        <SidebarPanel onClose={() => setIsSidebarOpen(false)} />
      )}

      {isInvitePanelOpen && (
        <InvitePanel onClose={() => setIsInvitePanelOpen(false)} />
      )}
    </div>
  );
}

export default Navbar;

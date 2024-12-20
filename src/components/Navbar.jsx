import React, { useState } from "react";
import { FaBars, FaVolumeMute } from "react-icons/fa";
import SidebarPanel from "./SidebarPanel";
import NavbarTitle from "./NavbarTitle";
import InvitePanel from "./InvitePanel";
import "../styles/Navbar.css";

function Navbar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInvitePanelOpen, setIsInvitePanelOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <button
          className="hamburger-button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <div className="logo">
          <span>Y</span>
        </div>
      </div>

      <NavbarTitle title={props.title} />
      <div className="navbar-buttons">
        <button
          className="invite-button"
          onClick={() => setIsInvitePanelOpen(true)}
        >
          Invite
        </button>
        <button className="connect-button">Connect</button>
        <div className="mute-icon">
          <FaVolumeMute size={18} color="#ff6868" />
        </div>
      </div>

      {isSidebarOpen && (
        <SidebarPanel onClose={() => setIsSidebarOpen(false)} />
      )}

      {isInvitePanelOpen && (
        <InvitePanel onClose={() => setIsInvitePanelOpen(false)} />
      )}
    </>
  );
}

export default Navbar;

import React from "react";
import "../styles/Navbar.css";

function NavbarTitle(props) {
  return (
    <span className="navbar-title">
      {props.title ? props.title : "YOLO Games | The Home of Degen Gaming"}
    </span>
  );
}

export default NavbarTitle;

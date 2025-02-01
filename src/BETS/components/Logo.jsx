import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../styles/Logo.css";

function Logo() {
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>
    </div>
  );
}

export default Logo;

import React from "react";

function NavbarTitle(props) {
  return (
    <span className={props.className}>
      {props.title ? props.title : "BETS"}
    </span>
  );
}

export default NavbarTitle;

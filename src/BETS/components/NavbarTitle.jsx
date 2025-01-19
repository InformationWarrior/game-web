import React from "react";

function NavbarTitle(props) {
  return (
    <span className={props.className}>
      {props.title ? props.title : "YOLO Games | The Home of Degen Gaming"}
    </span>
  );
}

export default NavbarTitle;

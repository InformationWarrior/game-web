import React from "react";

const Coin = (props) => {
  return (
    <svg
      viewBox="0 0 96 96"
      focusable="false"
      className="chakra-icon css-1d4430q"
      width={props.width || "24"}
      height={props.height || "24"}
      {...props}
    >
      <g clipPath="url(#160)">
        <circle cx="48" cy="48" r="48" fill="#DCDCDF"></circle>
        <g clipPath="url(#161)">
          <path d="M47.9941 13.7997L47.5352 15.3584V60.5862L47.9941 61.0441L68.9879 48.6344L47.9941 13.7997Z" fill="#767676"></path>
          <path d="M47.9944 13.7997L27 48.6344L47.9944 61.0441V39.0917V13.7997Z" fill="#8E8E8E"></path>
          <path d="M47.9924 65.0208L47.7338 65.3362V81.447L47.9924 82.202L68.9991 52.6176L47.9924 65.0208Z" fill="#5F5F5F"></path>
          <path d="M47.9944 82.202V65.0208L27 52.6176L47.9944 82.202Z" fill="#8E8E8E"></path>
          <path d="M47.9945 61.0433L68.9883 48.6337L47.9945 39.091V61.0433Z" fill="#5F5F5F"></path>
          <path d="M27 48.6337L47.9944 61.0433V39.091L27 48.6337Z" fill="#767676"></path>
        </g>
      </g>
      <defs>
        <clipPath id="160">
          <rect width="96" height="96" fill="white"></rect>
        </clipPath>
        <clipPath id="161">
          <rect width="42" height="84" fill="white" transform="translate(27 6)"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Coin;

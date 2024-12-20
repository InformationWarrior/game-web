import React from "react";
import PropTypes from "prop-types";

function BetOptionPanel(props) {
  return (
    <div className="container">
      <div className="game-logo"></div>
      <div className="entry">
        <h5>Entry</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with dropdown button"
          />
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BetOptionPanel;

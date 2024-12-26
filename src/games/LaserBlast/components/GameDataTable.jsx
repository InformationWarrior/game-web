import React from "react";
import "../styles/GameDataTable.css";

function GameDataTable() {
  return (
    <div className="laser-blast__data-container">
      {/* Header Section */}
      <div className="laser-blast__data-header">
        <span className="laser-blast__data-title">Recent Shots</span>
        <div className="laser-blast__data-controls">
          <button className="laser-blast__filter-btn">Mine</button>
          <button className="laser-blast__filter-btn active">All</button>
          <button className="laser-blast__filter-btn">Big Wins</button>
          <button className="laser-blast__filter-btn">Lucky Wins</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="laser-blast__data-table">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Risk</th>
              <th>Rows</th>
              <th>Shots</th>
              <th>Ending</th>
              <th>Payout</th>
              <th>Pin</th>
              <th>Date</th>
              <th>Utility</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample rows for demonstration */}
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td>Player {index + 1}</td>
                <td>High</td>
                <td>10</td>
                <td>5</td>
                <td>&lt;0.001</td>
                <td>0.002</td>
                <td>{index + 2}</td>
                <td>24/12/2024</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="laser-blast__data-footer">
        <button className="laser-blast__data-load-more">Load More</button>
      </div>
    </div>
  );
}

export default GameDataTable;

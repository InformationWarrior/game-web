import React, { useState } from "react";
import { SiFireship } from "react-icons/si";
import game from "../assets/game.webp";
import Coin from "./Coin";
import { FaUserCircle } from "react-icons/fa";

const totalPages = 10; // ✅ Total number of pages
const itemsPerPage = 10; // ✅ Items per page
const totalItems = 100; // ✅ Simulated total items

function Rewards() {
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Generate fake data
  const allWins = [...Array(totalItems)].map((_, i) => ({
    id: i + 1,
    game: "Wheel Spin",
    player: `Player${i + 1}`,
    entryAmount: "0.01 ETH",
    winAmount: "0.1 ETH",
  }));

  // ✅ Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWins = allWins.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <div className="btn-group rounded-pill border border-dark overflow-hidden">
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="rewards"
            checked
          />
          <label className="btn btn-dark px-4 py-2" for="rewards">
            Your Rewards
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            id="leaderboard"
          />
          <label className="btn btn-dark px-4 py-2" for="leaderboard">
            Leaderboard
          </label>
        </div>
      </div>

      {/* Recent Wins */}
      <section className="recent-wins pb-0">
        <div className="table-responsive wins-table w-100">
          <table className="table table-dark table-hover w-100">
            <thead>
              <tr>
                <th className="text-start py-3 ps-4 font-grotesk grey">Game</th>
                <th className="text-start py-3 font-grotesk grey">Player</th>
                <th className="text-center py-3 font-grotesk grey">
                  Entry Amount
                </th>
                <th className="text-end py-3 pe-4 font-grotesk grey">
                  Amount Won
                </th>
              </tr>
            </thead>
            <tbody>
              {currentWins.map((win) => (
                <tr key={win.id} className="align-middle">
                  <td className="font12 text-start py-3 ps-4 grey align-middle">
                    <img
                      src={game}
                      alt="game"
                      className="rounded game-image me-2"
                    />
                    {win.game}
                  </td>
                  <td className="font12 text-start py-3 align-middle">
                    <FaUserCircle size={19} color="green" className="me-2" />
                    {win.player}
                  </td>
                  <td className="font12 text-center py-3 align-middle">
                    {win.entryAmount}
                    <Coin className="ms-2" width="18" height="18" />
                  </td>
                  <td className="win-amount font12 text-end py-3 pe-4 align-middle">
                    {win.winAmount}
                    <Coin className="ms-2" width="18" height="18" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Dark Pagination Section */}
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-dark justify-content-center bg-dark p-2 rounded">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link bg-dark text-light border-0"
                onClick={() => changePage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {/* ✅ Dynamically create page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className={`page-link border-0 ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-dark text-light"
                  }`}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link bg-dark text-light border-0"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default Rewards;

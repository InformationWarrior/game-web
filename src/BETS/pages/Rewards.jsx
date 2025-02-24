import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BET_HISTORY_BY_WALLET } from "../../NetworkManager/graphql/Operations/queries";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import game from "../assets/game.webp";
import Coin from "./Coin";

const itemsPerPage = 10;

function Rewards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("rewards"); // ✅ Track selected tab

  const walletAddress = useSelector(
    (state) => state.bets.player?.walletAddress
  );

  const { loading, error, data } = useQuery(GET_BET_HISTORY_BY_WALLET, {
    variables: { walletAddress },
    skip: !walletAddress,
    fetchPolicy: "cache-and-network",
  });

  if (loading)
    return <p className="text-center text-light">Loading rewards...</p>;
  if (error)
    return <p className="text-center text-danger">Error loading rewards.</p>;

  const allWins = data?.getBetHistoryByWallet || [];
  const totalPages = Math.ceil(allWins.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWins = allWins.slice(indexOfFirstItem, indexOfLastItem);

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
            checked={selectedTab === "rewards"} // ✅ Controlled by state
            onChange={() => setSelectedTab("rewards")} // ✅ Fix
          />
          <label className="btn btn-dark px-4 py-2" htmlFor="rewards">
            Your Rewards
          </label>

          <input
            type="radio"
            className="btn-check"
            name="options"
            id="leaderboard"
            checked={selectedTab === "leaderboard"} // ✅ Controlled by state
            onChange={() => setSelectedTab("leaderboard")} // ✅ Fix
          />
          <label className="btn btn-dark px-4 py-2" htmlFor="leaderboard">
            Leaderboard
          </label>
        </div>
      </div>

      {selectedTab === "rewards" ? (
        <section className="recent-wins pb-0">
          <div className="table-responsive wins-table w-100">
            <table className="table table-dark table-hover w-100">
              <thead>
                <tr>
                  <th className="text-start py-3 ps-4 font-grotesk grey">
                    Game
                  </th>
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
                {currentWins.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-light py-4">
                      No rewards yet.
                    </td>
                  </tr>
                ) : (
                  currentWins.map((win, index) => (
                    <tr key={index} className="align-middle">
                      <td className="font12 text-start py-3 ps-4 grey align-middle">
                        <img
                          src={game}
                          alt="game"
                          className="rounded game-image me-2"
                        />
                        Wheel Spin
                      </td>
                      <td className="font12 text-start py-3 align-middle">
                        <FaUserCircle
                          size={19}
                          color="green"
                          className="me-2"
                        />
                        {win.username || "Unknown Player"}
                      </td>
                      <td className="font12 text-center py-3 align-middle">
                        {win.amount} ETH
                        <Coin className="ms-2" width="18" height="18" />
                      </td>
                      <td className="win-amount font12 text-end py-3 pe-4 align-middle">
                        {win.winAmount} ETH
                        <Coin className="ms-2" width="18" height="18" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination pagination-dark justify-content-center bg-dark p-2 rounded">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link bg-dark text-light border-0"
                  onClick={() => changePage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

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
      ) : (
        <p className="text-center text-light">Leaderboard coming soon...</p>
      )}
    </>
  );
}

export default Rewards;

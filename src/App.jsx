import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routesConfig from "./Config/routes/routesConfig";
import gamesConfig from "./Config/routes/gamesConfig";
import Sidebar from "./BETS/components/Sidebar";
import Navbar from "./BETS/components/Navbar";
// import GamesPanel from "./BETS/components/GamesPanel";
import "./App.css";

function App() {
  // const [showGamesPanel, setShowGamesPanel] = useState(false);
  const [navbarTitle, setNavbarTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Find the current route's title based on the path
    const currentRoute =
      routesConfig.find((route) => route.path === location.pathname) ||
      gamesConfig.find((game) => game.path === location.pathname);

    if (currentRoute) {
      setNavbarTitle(currentRoute.title || ""); // Set title or default to an empty string
    }
  }, [location.pathname]);

  return (
    <>
      <div className="app-container">
        <div className="app-sidebar">
          <Sidebar
          // showGamesPanel={showGamesPanel}
          // setShowGamesPanel={setShowGamesPanel}
          />
        </div>

        <div className="app-main">
          <div className="main-navbar">
            <Navbar title={navbarTitle} />
          </div>
          <div className="content-wrapper">
            {/* {showGamesPanel && (
              <GamesPanel setShowGamesPanel={setShowGamesPanel} />
            )} */}
            <Routes>
              {routesConfig.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              {gamesConfig.map((game, index) => (
                <Route key={index} path={game.path} element={game.element} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

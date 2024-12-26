import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import routesConfig from "./routes/routesConfig";
import gamesConfig from "./routes/gamesConfig";
import Navbar from "./components/Navbar";
import GamesPanel from "./components/GamesPanel";
import "./App.css";

function App() {
  const [showGamesPanel, setShowGamesPanel] = useState(false);

  return (
    <>
      <div className="app-container">
        <div className="app-sidebar">
          <Sidebar
            showGamesPanel={showGamesPanel}
            setShowGamesPanel={setShowGamesPanel}
          />
        </div>

        <div className="app-main">
          <div className="main-navbar">
            <Navbar />
          </div>
          <div className="content-wrapper">
            {showGamesPanel && (
              <GamesPanel setShowGamesPanel={setShowGamesPanel} />
            )}
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

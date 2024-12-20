import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import routesConfig from "./routes/routesConfig";
import gamesConfig from "./routes/gamesConfig";
import Navbar from "./components/Navbar";
import "./App.css";
import GamesPanel from "./components/GamesPanel";

function App() {
  const [showGamesPanel, setShowGamesPanel] = useState(false);

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <Sidebar
            showGamesPanel={showGamesPanel}
            setShowGamesPanel={setShowGamesPanel}
          />
        </div>

        <div className="main-container">
          <div className="nav-bar">
            <Navbar />
          </div>
          <div className="main-content">
            {showGamesPanel && <GamesPanel />}
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

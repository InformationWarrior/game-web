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

// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import GamesPanel from "./components/GamesPanel";
// import routesConfig from "./routes/routesConfig";
// import gamesConfig from "./routes/gamesConfig";
// import "./App.css";

// const App = () => {
//   const [showGamesPanel, setShowGamesPanel] = useState(false);

//   return (
//     <div className="app-container">
//       <AppSidebar
//         showGamesPanel={showGamesPanel}
//         setShowGamesPanel={setShowGamesPanel}
//       />
//       <AppMain
//         showGamesPanel={showGamesPanel}
//         routesConfig={routesConfig}
//         gamesConfig={gamesConfig}
//       />
//     </div>
//   );
// };

// export default App;

// // Sidebar Component Wrapper
// const AppSidebar = ({ showGamesPanel, setShowGamesPanel }) => (
//   <div className="app-sidebar">
//     <Sidebar
//       showGamesPanel={showGamesPanel}
//       setShowGamesPanel={setShowGamesPanel}
//     />
//   </div>
// );

// // Main Content Wrapper
// const AppMain = ({ showGamesPanel, routesConfig, gamesConfig }) => (
//   <div className="app-main">
//     <NavbarSection />
//     <ContentWrapper
//       showGamesPanel={showGamesPanel}
//       routesConfig={routesConfig}
//       gamesConfig={gamesConfig}
//     />
//   </div>
// );

// // Navbar Section
// const NavbarSection = () => (
//   <div className="main-navbar">
//     <Navbar />
//   </div>
// );

// // Content Section Wrapper
// const ContentWrapper = ({ showGamesPanel, routesConfig, gamesConfig }) => (
//   <div className="content-wrapper">
//     {showGamesPanel && <GamesPanel />}
//     <DynamicRoutes routesConfig={routesConfig} gamesConfig={gamesConfig} />
//   </div>
// );

// // Dynamic Routes Component
// const DynamicRoutes = ({ routesConfig, gamesConfig }) => (
//   <Routes>
//     {routesConfig.map((route, index) => (
//       <Route key={`route-${index}`} path={route.path} element={route.element} />
//     ))}
//     {gamesConfig.map((game, index) => (
//       <Route key={`game-${index}`} path={game.path} element={game.element} />
//     ))}
//   </Routes>
// );

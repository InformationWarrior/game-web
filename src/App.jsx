import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routesConfig from "./Config/routes/routesConfig";
import gamesConfig from "./Config/routes/gamesConfig";
import Sidebar from "./BETS/components/Sidebar";
import Navbar from "./BETS/components/Navbar";
import "./App.css";

function App() {
  const [navbarTitle, setNavbarTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentRoute =
      routesConfig.find((route) => route.path === location.pathname) ||
      gamesConfig.find((game) => game.path === location.pathname);

    if (currentRoute) {
      setNavbarTitle(currentRoute.title || "");
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <div className="app-sidebar">
        <Sidebar />
      </div>

      <div className="app-main">
        <div className="main-navbar">
          <Navbar title={navbarTitle} />
        </div>
        <div className="content-wrapper container py-3">
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
  );
}

export default App;






// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import routesConfig from "./Config/routes/routesConfig";
// import gamesConfig from "./Config/routes/gamesConfig";
// import Sidebar from "./BETS/components/Sidebar";
// import Navbar from "./BETS/components/Navbar";
// import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllGames } from "./Config/redux/slices/betsSlice";

// function App() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const gameList = useSelector((state) => state.bets.games);
//   const [navbarTitle, setNavbarTitle] = useState(null);

//   useEffect(() => {
//     dispatch(getAllGames());
//   }, []);

//   useEffect(() => {
//     const currentRoute =
//       routesConfig.find((route) => route.path === location.pathname) ||
//       gamesConfig.find((game) => game.path === location.pathname);

//     if (currentRoute) {
//       setNavbarTitle(currentRoute.title || "");
//     }
//   }, [location.pathname]);

//   return (
//     <div className="app-container">
//       <div className="app-sidebar">
//         <Sidebar />
//       </div>

//       <div className="app-main">
//         <div className="main-navbar">
//           <Navbar title={navbarTitle} />
//         </div>
//         <div className="content-wrapper container py-3">
//           <Routes>
//             {routesConfig.map((route, index) => (
//               <Route key={index} path={route.path} element={route.element} />
//             ))}
//             {gameList.map((game, index) => (
//               <Route key={index} path={game.path} element={game.element} />
//             ))}
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

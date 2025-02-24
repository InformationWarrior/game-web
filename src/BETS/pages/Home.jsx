import React from "react";
import "../styles/Home.css";
import { SiFireship } from "react-icons/si";
import game from "../assets/game.webp";
import Coin from "./Coin";
import { FaUserCircle } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import gamesConfig from "../../Config/routes/gamesConfig";
import banner from "../assets/Banner.jpeg";
import banner2 from "../assets/dummyBanner.jpg";
import GameCard from "../components/GameCard"; // Import GameCard
import Slider from "react-slick";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const data = [
  {
    id: 1,
    count: "133166",
    title: "Total Players",
  },
  {
    id: 2,
    count: "657112",
    title: "Total Game Volume",
  },
  {
    id: 3,
    count: "30824135",
    title: "Total Games Played",
  },
];

const HomePage = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Animation speed in ms
    slidesToShow: 1, // Number of slides visible at a time
    slidesToScroll: 1, // Number of slides to scroll per action
    arrows: false, // Show next/prev arrows
    autoplay: true, // Enables automatic sliding
    autoplaySpeed: 3000, // Delay between slides (3s)
    responsive: [
      // Responsive settings
      {
        breakpoint: 768, // On screens <= 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // On screens <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <>
      <div className="homepage">
        <div className="banner-new mb-2">
          <Slider {...settings}>
            <img src={banner} alt="Banner" className="banner-image" />
            <img src={banner2} alt="Banner" className="banner-image" />
          </Slider>
        </div>
        {/* Header */}
        <header className="homepage-header">
          <span>BETS GAMES</span>
        </header>

        {/* Popular Games */}
        <section>
          {gamesConfig.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              imgSrc={game.imgSrc}
              path={game.path}
              gameId={game.id}
            />
          ))}
        </section>

        {/* Platform Stats */}
        <section ref={ref} className="platform-stats">
          <h2 className="mb-3">
            <ImStatsBars /> PLATFORM STATS
          </h2>
          <div className="stats-grid">
            {data?.map((item) => (
              <div key={item?.id} className="stat-card">
                <p>{item?.title}</p>
                <hr />
                <CountUp
                  duration={6}
                  end={inView ? item.count : 0}
                  suffix={item.id === 2 ? " ETH" : ""}
                  style={{
                    margin: "10px 0",
                    color: "#c5ff47",
                    fontFamily: "Yapari, sans-serif",
                    fontSize: "1.75rem",
                    lineHeight: "2rem",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    transform: "translateY(4px)",
                    fontWeight: "700",
                  }}
                  className="font-grotesk"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Wins */}
        <section className="recent-wins pb-0">
          <h2 className="mb-3">
            <SiFireship /> RECENT WINS
          </h2>

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
                {[...Array(8)].map((_, i) => (
                  <tr key={i} className="align-middle">
                    <td className="font12 text-start py-3 ps-4 grey align-middle">
                      <img
                        src={game}
                        alt="game"
                        className="rounded game-image me-2"
                      />
                      Wheel Spin
                    </td>
                    <td className="font12 text-start py-3 align-middle">
                      <FaUserCircle size={19} color="green" className="me-2" />
                      Player{i + 1}
                    </td>
                    <td className="font12 text-center py-3 align-middle">
                      0.01 ETH
                      <Coin className="ms-2" width="18" height="18" />
                    </td>
                    <td className="win-amount font12 text-end py-3 pe-4 align-middle">
                      0.1 ETH
                      <Coin className="ms-2" width="18" height="18" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

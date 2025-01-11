import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./components/HomeView/HomeView";
import TypeView from "./components/TypeView/TypeView";
import PokeView from "./components/PokeView/PokeView";
import NotFoundView from "./components/NotFoundView/NotFoundView";
import "./App.css";

function App() {
  // Variables to be passed around to different views
  const [fullPokeResults, setFullPokeResults] = useState([]);
  const [pokeResults, setPokeResults] = useState([]);
  const [pokeCountTotal, setPokeCountTotal] = useState(1025);
  const [filterByGen, setFilterByGen] = useState("all");
  const [sortBy, setSortBy] = useState("number");
  const [screenSize, setscreenSize] = useState("large");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check screen size to see if types table should collapse (small, medium, large, x-large)
  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth < 576) {
        setscreenSize("small");
      } else if (window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium");
      } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
        setscreenSize("large");
      } else {
        setscreenSize("x-large");
      }
    };

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  // Check if the user is in dark mode or not
  useEffect(() => {
    // Check the user's preference on initial render
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);

    // Watch for changes in the user's preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
    });

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", () => {});
  }, []);

  // Fetch the Pokémon information for all Pokémon as soon as the page is loaded
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
      .then((response) => response.json())
      .then((data) => {
        setFullPokeResults(data.results);
        setPokeCountTotal(data.count);
      });
  }, []);

  return (
    <div className={`${isDarkMode ? "background-dark" : "background-light"}`}>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <HomeView
              pokeResults={pokeResults}
              setPokeResults={setPokeResults}
              fullPokeResults={fullPokeResults}
              pokeCountTotal={pokeCountTotal}
              filterByGen={filterByGen}
              setFilterByGen={setFilterByGen}
              sortBy={sortBy}
              setSortBy={setSortBy}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/types/:id"
          element={
            <TypeView
              pokeResults={pokeResults}
              setPokeResults={setPokeResults}
              fullPokeResults={fullPokeResults}
              pokeCountTotal={pokeCountTotal}
              filterByGen={filterByGen}
              setFilterByGen={setFilterByGen}
              sortBy={sortBy}
              setSortBy={setSortBy}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/pokemon"
          element={<PokeView screenSize={screenSize} isDarkMode={isDarkMode} />}
        />
        <Route
          path="/notfound"
          element={
            <NotFoundView
              fullPokeResults={fullPokeResults}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFoundView
              fullPokeResults={fullPokeResults}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;

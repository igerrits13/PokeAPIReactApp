import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./components/HomeView/HomeView";
import TypeView from "./components/TypeView/TypeView";
import PokeView from "./components/PokeView/PokeView";
import "./App.css";

function App() {
  // Variables to be passed around to different views
  const [pokeCountTotal, setPokeCountTotal] = useState(1025);
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

  return (
    <div className={`${isDarkMode ? "background-dark" : "background-light"}`}>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <HomeView
              pokeCountTotal={pokeCountTotal}
              setPokeCountTotal={setPokeCountTotal}
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
              pokeCountTotal={pokeCountTotal}
              sortBy={sortBy}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/pokemon"
          element={<PokeView screenSize={screenSize} isDarkMode={isDarkMode} />}
        />
      </Routes>
    </div>
  );
}
export default App;

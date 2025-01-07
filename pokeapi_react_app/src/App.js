import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./components/HomeView/HomeView";
import TypeView from "./components/TypeView/TypeView";
import "./App.css";

function App() {
  const [screenSize, setscreenSize] = useState("large");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check screen size to see if types table should collapse
  useEffect(() => {
    const handleScreenResize = () => {
      // Handle small screen
      if (window.innerWidth < 576) {
        setscreenSize("small");
      }

      // Handle medium screen
      else if (window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium");
      }

      // Handle large screen
      else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
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
    <div>
      <Routes>
        <Route
          path="/"
          exact
          element={<HomeView screenSize={screenSize} isDarkMode={isDarkMode} />}
        />
        <Route
          path="/grasstype"
          exact
          element={<TypeView screenSize={screenSize} isDarkMode={isDarkMode} />}
        />
      </Routes>
    </div>
  );
}
export default App;

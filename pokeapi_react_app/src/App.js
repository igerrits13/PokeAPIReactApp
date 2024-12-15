import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeView from "./components/HomeView";
import HomeViewOld from "./components/old/HomeView_old";
import "./App.css";
import "./App_old.css";

function App() {
  const [screenSize, setscreenSize] = useState("large");

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
      }

      else {
        setscreenSize("x-large");
      }
    };

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomeView screenSize={screenSize} />} />
        <Route path="/old" element={<HomeViewOld />} />
      </Routes>
    </div>
  );
}
export default App;

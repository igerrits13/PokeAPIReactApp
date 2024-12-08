import "./App.css";
import "./App_old.css";
import HomeView from "./components/HomeView";
import HomeViewOld from "./components/old/HomeView_old";
import { Routes, Route } from "react-router-dom";

function App() {
  /*!
   * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
   * Copyright 2011-2024 The Bootstrap Authors
   * Licensed under the Creative Commons Attribution 3.0 Unported License.
   */

  // (() => {
  //   const getStoredTheme = () => localStorage.getItem("theme");

  //   const getPreferredTheme = () => {
  //     const storedTheme = getStoredTheme();
  //     if (storedTheme) {
  //       return storedTheme;
  //     }

  //     return window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light";
  //   };

  //   const setTheme = (theme) => {
  //     if (theme === "auto") {
  //       document.documentElement.setAttribute(
  //         "data-bs-theme",
  //         window.matchMedia("(prefers-color-scheme: dark)").matches
  //           ? "dark"
  //           : "light"
  //       );
  //     } else {
  //       document.documentElement.setAttribute("data-bs-theme", theme);
  //     }
  //   };

  //   setTheme(getPreferredTheme());
  // })();

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomeView />} />
        <Route path="/old" element={<HomeViewOld />} />
      </Routes>
    </div>
  );
}
export default App;

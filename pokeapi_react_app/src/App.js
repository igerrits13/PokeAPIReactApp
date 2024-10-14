import "./App.css";
import { useEffect, useState } from "react";

function App() {
  /*!
   * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
   * Copyright 2011-2024 The Bootstrap Authors
   * Licensed under the Creative Commons Attribution 3.0 Unported License.
   */

  (() => {
    const getStoredTheme = () => localStorage.getItem("theme");
    const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme) {
        return storedTheme;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    const setTheme = (theme) => {
      if (theme === "auto") {
        document.documentElement.setAttribute(
          "data-bs-theme",
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
      }
    };

    setTheme(getPreferredTheme());

    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector("#bd-theme");

      if (!themeSwitcher) {
        return;
      }

      const themeSwitcherText = document.querySelector("#bd-theme-text");
      const activeThemeIcon = document.querySelector(".theme-icon-active use");
      const btnToActive = document.querySelector(
        `[data-bs-theme-value="${theme}"]`
      );
      const svgOfActiveBtn = btnToActive
        .querySelector("svg use")
        .getAttribute("href");

      document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
        element.classList.remove("active");
        element.setAttribute("aria-pressed", "false");
      });

      btnToActive.classList.add("active");
      btnToActive.setAttribute("aria-pressed", "true");
      activeThemeIcon.setAttribute("href", svgOfActiveBtn);
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
      themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

      if (focus) {
        themeSwitcher.focus();
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== "light" && storedTheme !== "dark") {
          setTheme(getPreferredTheme());
        }
      });

    // window.addEventListener("DOMContentLoaded", () => {
    //   showActiveTheme(getPreferredTheme());

    //   document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    //     toggle.addEventListener("click", () => {
    //       const theme = toggle.getAttribute("data-bs-theme-value");
    //       setStoredTheme(theme);
    //       setTheme(theme);
    //       showActiveTheme(theme, true);
    //     });
    //   });
    // });
  })();

  const SearchBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
      setIsHovered(true);
    };

    const handleUnHover = () => {
      setIsHovered(false);
    };

    const currSearch = isHovered ? "showSearch" : "";

    return (
      <div className="container">
        <div className="container-md d-flex justify-content-center my-5">
          <form
            className={`bg-secondary rounded-pill pokeSearch delay ${currSearch}`}
            role="search"
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
          >
            <input
              type="search"
              placeholder="Search Pokémon"
              className="h-100 w-100 rounded-pill bg-secondary pokeSearchBar"
              aria-label="Search"
            />

            <div
              className={
                "rounded-circle align-self-center bg-body searchButton"
              }
            >
              <i className="fa-solid fa-magnifying-glass searchIcon"></i>
              <img
                className="searchBall"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              ></img>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SearchBar />
    </div>
  );
}
export default App;

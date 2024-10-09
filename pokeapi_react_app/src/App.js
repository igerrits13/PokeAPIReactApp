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
    return (
      <div className="container-sm bg-light ">
        <img
          className="ball mx-auto d-block"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          height={"64px"}
        ></img>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Pokémon"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
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

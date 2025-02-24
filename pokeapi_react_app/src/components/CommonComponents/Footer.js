import { motion } from "motion/react";
import APILogo from "../icons/PokeAPILogo.svg";

// Website footer
const Footer = ({ isDarkMode, screenSize }) => {
  // Setup the font, icon and background style based on if the user is using dark mode or not
  const footerStyle = isDarkMode ? "font-dark" : "font-light";
  const iconStyle = isDarkMode ? "footer-icon-dark" : "footer-icon-light";
  const backgroundStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "footer-small"
      : screenSize === "medium"
      ? "footer-med"
      : "footer-large";

  // Get the current year for displaying within the footer
  const currentYear = new Date().getFullYear();

  // Display a footer showing Github, copywrite information and API information
  return (
    <div
      className={`footer-container ${footerStyle} ${backgroundStyle} ${containerSize}`}
    >
      <div className="footer-item-1">
        <a
          className=""
          href="https://github.com/igerrits13"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
        >
          <motion.i
            whileHover={{ scale: 1.1, rotate: "-3deg" }}
            whileTap={{ scale: 0.9, rotate: "5deg" }}
            transition={{ duration: 0.1 }}
            className={`fa-brands fa-github github-logo ${iconStyle}`}
          ></motion.i>
        </a>
      </div>
      <div className="footer-item-2">
        &copy; Designed and developed by{" "}
        <a href="mailto:igerrits@yahoo.com">Ian Gerrits</a> {currentYear}{" "}
      </div>
      <div className="footer-item-3">
        All data from
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          aria-label="PokeAPI"
        >
          <motion.img
            className="api-logo"
            src={`${APILogo}`}
            alt={`API Logo`}
            whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
            whileTap={{ scale: 0.9, rotate: "5deg" }}
            transition={{ duration: 0.1 }}
          />
        </a>
      </div>
      <div className="footer-item-4">
        Pokémon is a registered trademark of Nintendo, Game Freak, and Creatures
      </div>
    </div>
  );
};

export default Footer;

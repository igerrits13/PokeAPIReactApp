import { motion } from "motion/react";
import APILogo from "../icons/PokeAPILogo.svg";

// Website footer
const Footer = ({ isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const footerStyle = isDarkMode ? "font-dark" : "font-light";

  const iconStyle = isDarkMode ? "footer-icon-dark" : "footer-icon-light";

  const currentYear = new Date().getFullYear();

  return (
    <div className={`footer-container ${footerStyle}`}>
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

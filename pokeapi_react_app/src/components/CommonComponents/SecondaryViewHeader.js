import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SearchBar from "./SearchBarComponents/SearchBar";

// Header to be used on secondary pages to display a link to the homepage and the search bar
const SecondaryViewHeader = ({
  fullPokeResults,
  typesResults,
  screenSize,
  isDarkMode,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "title-font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-header-small"
      : screenSize === "medium"
      ? "secondary-header-med"
      : screenSize === "large"
      ? "secondary-header-large"
      : "secondary-header-x-large";
  const secondaryHeaderContainerStyle =
    screenSize === "small"
      ? "secondary-header-container-small"
      : screenSize === "med"
      ? "secondary-header-container secondary-header-container-med"
      : "secondary-header-container secondary-header-container-large";
  const headerBackgroundStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";

  // Display to show the link to the home page and search bar
  return (
    <div
      className={`${secondaryHeaderContainerStyle} ${headerBackgroundStyle}`}
    >
      <Link to="/" className="clean-text">
        <motion.div
          className={`secondary-header ${secondaryHeaderStyle} ${fontStyle}`}
          whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
          whileTap={{ scale: 0.9, rotate: "5deg" }}
          transition={{ duration: 0.1 }}
        >
          Pokémon Lookup
        </motion.div>
      </Link>
      <SearchBar
        fullPokeResults={fullPokeResults}
        typesResults={typesResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SecondaryViewHeader;

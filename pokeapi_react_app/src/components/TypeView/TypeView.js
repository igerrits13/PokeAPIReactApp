import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SearchBar from "../HomeView/SearchBar";
import PokemonTypesCardCollection from "./PokemonTypesCardCollection";
import Footer from "../CommonComponents/Footer";

const TypeView = ({
  fullPokeResults,
  pokeCountTotal,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
  // Setup data structures to store type data of the current type
  const [typeData, setTypeData] = useState([]);

  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
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
      : "secondary-header-container";

  const secondaryTitleHTML = (
    <div className={`${secondaryHeaderContainerStyle}`}>
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
      {/* <div className="secondary-searchbar-container"> */}
      <SearchBar fullPokeResults={fullPokeResults} isDarkMode={isDarkMode} />
      {/* </div> */}
    </div>
  );

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "typeview-small"
      : screenSize === "medium"
      ? "typeview-med"
      : "typeview-large";

  // Display the type view page from its components
  return (
    <div
      className={`typeview-container ${containerSize} ${fontStyle} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      {secondaryTitleHTML}
      Here is the Type View. <Link to="/">Here</Link> is a button to go home!
      <p>This is for {typeData.name} type</p>
      <p>One more line before Pokémon</p>
      <PokemonTypesCardCollection
        typeData={typeData}
        setTypeData={setTypeData}
        pokeCountTotal={pokeCountTotal}
        sortBy={sortBy}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypeView;

import { useState } from "react";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
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
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
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

import { useState } from "react";
import { Link } from "react-router-dom";
import PokemonTypesCardCollection from "./PokemonTypesCardCollection";
import Footer from "../CommonComponents/Footer";

const TypeView = ({ pokeCountTotal, sortBy, screenSize, isDarkMode }) => {
  // Setup data structures to store type data of the current type
  const [typeData, setTypeData] = useState([]);

  // Setup the title font style based on if the user is using light or dark mode
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

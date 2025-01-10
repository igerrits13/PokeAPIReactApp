import { useState } from "react";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import DynamicSortOptions from "../CommonComponents/DynamicSortOptions";
import OptionGen from "../CommonComponents/OptionGen";
import OptionSort from "../CommonComponents/OptionSort";
import PokemonTypesCardCollection from "./PokemonTypesCardCollection";
import Footer from "../CommonComponents/Footer";

const TypeView = ({
  fullPokeResults,
  pokeCountTotal,
  filterByGen,
  setFilterByGen,
  sortBy,
  setSortBy,
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

  // Options to be displayed in the home page Pokémon view
  const sortOptions = [
    <OptionGen
      key={1}
      filterByGen={filterByGen}
      setFilterByGen={setFilterByGen}
      isDarkMode={isDarkMode}
    />,
    <OptionSort
      key={3}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isDarkMode={isDarkMode}
    />,
  ];

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
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
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

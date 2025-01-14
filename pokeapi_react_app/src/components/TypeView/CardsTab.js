import { useState } from "react";
import DynamicSortOptions from "../CommonComponents/DynamicSortOptions";
import OptionGen from "../CommonComponents/OptionGen";
import OptionSort from "../CommonComponents/OptionSort";
import PokemonTypesCardCollection from "./PokemonTypesCardCollection";

// Tab to display Pokémon within the types table
const CardsTab = ({
  pokeResults,
  setPokeResults,
  pokeCountTotal,
  filterByGen,
  setFilterByGen,
  activeTab,
  sortBy,
  setSortBy,
  isDarkMode,
  screenSize,
}) => {
  // Setup data structures to store type data of the current type
  const [typeData, setTypeData] = useState([]);

  // Options to be displayed in the home page Pokémon view
  const sortOptions = [
    <OptionGen
      key={0}
      filterByGen={filterByGen}
      setFilterByGen={setFilterByGen}
      isDarkMode={isDarkMode}
    />,
    <OptionSort
      key={1}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isDarkMode={isDarkMode}
    />,
  ];

  return (
    <div
      style={{
        display: activeTab === "Pokémon" ? "block" : "none",
      }}
    >
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
      <PokemonTypesCardCollection
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        typeData={typeData}
        setTypeData={setTypeData}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        sortBy={sortBy}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default CardsTab;

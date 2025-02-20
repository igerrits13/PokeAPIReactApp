import DynamicSortOptions from "../../CommonComponents/DynamicComponents/DynamicSortOptions";
import OptionGen from "../../CommonComponents/OptionsComponents/OptionGen";
import OptionSort from "../../CommonComponents/OptionsComponents/OptionSort";
import PokemonTypesCardCollection from "./PokemonTypesCardCollection";

// Tab to display Pokémon within the types table
const CardsTab = ({
  pokeResults,
  setPokeResults,
  pokeCountTotal,
  filterByGen,
  setFilterByGen,
  typeData,
  setTypeData,
  isTypesLoading,
  setIsTypesLoading,
  sortBy,
  setSortBy,
  isDarkMode,
  screenSize,
}) => {
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

  // Display Pokémon tab when active
  return (
    <div>
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
      <PokemonTypesCardCollection
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        typeData={typeData}
        setTypeData={setTypeData}
        isTypesLoading={isTypesLoading}
        setIsTypesLoading={setIsTypesLoading}
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

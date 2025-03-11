// import DynamicSortOptions from "../../CommonComponents/DynamicComponents/DynamicSortOptions";
import OptionGen from "../../CommonComponents/OptionsComponents/OptionGen";
import OptionSort from "../../CommonComponents/OptionsComponents/OptionSort";
import ResetOptions from "../../CommonComponents/OptionsComponents/ResetOptions";
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
  // isTypesLoading,
  // setIsTypesLoading,
  sortBy,
  setSortBy,
  isDarkMode,
  screenSize,
  callCount,
  setCallCount,
}) => {
  // Options to be displayed in the home page Pokémon view
  const sortOptions = [
    <OptionGen
      key={0}
      filterByGen={filterByGen}
      setFilterByGen={setFilterByGen}
      isDarkMode={isDarkMode}
      callCount={callCount}
      setCallCount={setCallCount}
    />,
    <OptionSort
      key={1}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isDarkMode={isDarkMode}
    />,
    <ResetOptions
      key={2}
      setFilterOptions={[setFilterByGen]}
      setSortOptions={setSortBy}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />,
  ];

  // Display Pokémon tab when active
  return (
    <div>
      {/* <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} /> */}
      <PokemonTypesCardCollection
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        typeData={typeData}
        setTypeData={setTypeData}
        // isTypesLoading={isTypesLoading}
        // setIsTypesLoading={setIsTypesLoading}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        sortBy={sortBy}
        sortOptions={sortOptions}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
        callCount={callCount}
        setCallCount={setCallCount}
      />
    </div>
  );
};

export default CardsTab;

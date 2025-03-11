import { useEffect } from "react";
import ScrollToTop from "../CommonComponents/ScrollToTop";
import Title from "./Title";
import SearchBar from "../CommonComponents/SearchBarComponents/SearchBar";
import WhosThatPokemon from "./WhosThatPokemon";
import TypeseTable from "./TypesTableComponents/TypesTable";
import OptionGen from "../CommonComponents/OptionsComponents/OptionGen";
import OptionType from "../CommonComponents/OptionsComponents/OptionType";
import OptionSort from "../CommonComponents/OptionsComponents/OptionSort";
import ResetOptions from "../CommonComponents/OptionsComponents/ResetOptions";
import PokemonTable from "../CommonComponents/PokemonCardComponents/PokemonTable";
import Footer from "../CommonComponents/Footer";

// Homeview page of the Pokémon app
const HomeView = ({
  pokeResults,
  setPokeResults,
  whosThatPokemon,
  setWhosThatPokemon,
  isPokeResultsLoading,
  typesResults,
  isTypesResultsLoading,
  fullPokeResults,
  pokeCountTotal,
  filterByGen,
  setFilterByGen,
  filterByType,
  setFilterByType,
  sortBy,
  setSortBy,
  screenSize,
  isDarkMode,
  callCount,
  setCallCount,
}) => {
  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "homeview-small"
      : screenSize === "medium"
      ? "homeview-med"
      : "homeview-large";

  // Scroll to top of page on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset sort options on initial page load
  useEffect(() => {
    setFilterByGen(["all"]);
    setFilterByType(["all"]);
    setSortBy("number");
    setWhosThatPokemon(false);
  }, [setFilterByGen, setFilterByType, setSortBy, setWhosThatPokemon]);

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
    <OptionType
      key={1}
      filterByType={filterByType}
      setFilterByType={setFilterByType}
      typesResults={typesResults}
      isDarkMode={isDarkMode}
    />,
    <OptionSort
      key={2}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isDarkMode={isDarkMode}
    />,
    <ResetOptions
      key={3}
      setFilterOptions={[setFilterByGen, setFilterByType]}
      setSortOptions={setSortBy}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />,
  ];

  // Display the overall veiw of the homepage using components
  return (
    <div
      className={`homeview-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <ScrollToTop isDarkMode={isDarkMode} />
      <Title screenSize={screenSize} isDarkMode={isDarkMode} />
      {!isPokeResultsLoading && !isTypesResultsLoading && (
        <SearchBar
          fullPokeResults={fullPokeResults}
          typesResults={typesResults}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      )}
      {!isPokeResultsLoading && (
        <WhosThatPokemon
          whosThatPokemon={whosThatPokemon}
          setWhosThatPokemon={setWhosThatPokemon}
          pokeResults={pokeResults}
          isDarkMode={isDarkMode}
        />
      )}
      <TypeseTable
        screenSize={screenSize}
        typesResults={typesResults}
        isDarkMode={isDarkMode}
      />
      {screenSize !== "small" && <hr />}
      {/* <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} /> */}
      <PokemonTable
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        screenSize={screenSize}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        filterByType={filterByType}
        sortBy={sortBy}
        sortOptions={sortOptions}
        isDarkMode={isDarkMode}
        callCount={callCount}
        setCallCount={setCallCount}
      />
      <Footer isDarkMode={isDarkMode} screenSize={screenSize} />
    </div>
  );
};

export default HomeView;

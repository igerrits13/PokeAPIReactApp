import { useState, useEffect } from "react";
import ScrollToTop from "../CommonComponents/ScrollToTop";
import Title from "./Title";
import SearchBar from "../CommonComponents/SearchBarComponents/SearchBar";
import TypeseTable from "./TypesTableComponents/TypesTable";
import DynamicSortOptions from "../CommonComponents/DynamicComponents/DynamicSortOptions";
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
}) => {
  // State to store data of all possible Pokémon types
  const [typesResults, setTypesResult] = useState([]);

  // Fetch the Pokémon types
  useEffect(() => {
    // Reset sort options
    setFilterByGen(["all"]);
    setFilterByType(["all"]);
    setSortBy("number");

    fetch(`https://pokeapi.co/api/v2/type/?limit=-1`)
      .then((response) => response.json())
      .then((data) => {
        setTypesResult(data.results);
      });
  }, [setFilterByGen, setFilterByType, setSortBy]);

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "homeview-small"
      : screenSize === "medium"
      ? "homeview-med"
      : "homeview-large";

  // Options to be displayed in the home page Pokémon view
  const sortOptions = [
    <OptionGen
      key={0}
      filterByGen={filterByGen}
      setFilterByGen={setFilterByGen}
      isDarkMode={isDarkMode}
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
      <SearchBar fullPokeResults={fullPokeResults} isDarkMode={isDarkMode} />
      <TypeseTable
        screenSize={screenSize}
        typesResults={typesResults}
        isDarkMode={isDarkMode}
      />
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
      <PokemonTable
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        screenSize={screenSize}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        filterByType={filterByType}
        sortBy={sortBy}
        isDarkMode={isDarkMode}
      />
      <Footer isDarkMode={isDarkMode} screenSize={screenSize} />
    </div>
  );
};

export default HomeView;

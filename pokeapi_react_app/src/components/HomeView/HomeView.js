import { useState, useEffect } from "react";
import Title from "./Title";
import SearchBar from "./SearchBar";
import TypeseTable from "./TypesTable";
import DynamicSortOptions from "../CommonComponents/DynamicSortOptions";
import OptionGen from "./OptionGen";
import OptionType from "./OptionType";
import OptionSort from "./OptionSort";
// import SortOptions from "./SortOptions";
import PokemonTable from "../CommonComponents/PokemonTable";
import Footer from "../CommonComponents/Footer";

// Homeview page of the Pokémon app
const HomeView = ({
  fullPokeResults,
  pokeCountTotal,
  sortBy,
  setSortBy,
  screenSize,
  isDarkMode,
}) => {
  const [typesResults, setTypesResult] = useState([]);
  const [filterByGen, setFilterByGen] = useState("all");
  const [filterByType, setFilterByType] = useState("all");

  // Fetch the Pokémon types
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/?limit=-1`)
      .then((response) => response.json())
      .then((data) => {
        setTypesResult(data.results);
      });
  }, []);

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "homeview-small"
      : screenSize === "medium"
      ? "homeview-med"
      : "homeview-large";

  const sortOptions = [
    <OptionGen
      key={1}
      filterByGen={filterByGen}
      setFilterByGen={setFilterByGen}
      isDarkMode={isDarkMode}
    />,
    <OptionType
      key={2}
      filterByType={filterByType}
      setFilterByType={setFilterByType}
      typesResults={typesResults}
      isDarkMode={isDarkMode}
    />,
    <OptionSort
      key={3}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isDarkMode={isDarkMode}
    />,
  ];

  return (
    <div
      className={`homeview-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <Title screenSize={screenSize} isDarkMode={isDarkMode} />
      <SearchBar fullPokeResults={fullPokeResults} isDarkMode={isDarkMode} />
      <TypeseTable
        screenSize={screenSize}
        typesResults={typesResults}
        isDarkMode={isDarkMode}
      />
      {/* <SortOptions
        screenSize={screenSize}
        filterByGen={filterByGen}
        setFilterByGen={setFilterByGen}
        filterByType={filterByType}
        setFilterByType={setFilterByType}
        typesResults={typesResults}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isDarkMode={isDarkMode}
      /> */}
      <DynamicSortOptions sortOptions={sortOptions} screenSize={screenSize} />
      <PokemonTable
        screenSize={screenSize}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        filterByType={filterByType}
        sortBy={sortBy}
        isDarkMode={isDarkMode}
      />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default HomeView;

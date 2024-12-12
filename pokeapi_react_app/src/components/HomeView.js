import { useState, useEffect } from "react";
import Title from "./Title";
import SearchBar from "./SearchBar";
import TypeseTable from "./TypesTable";
import SortOptions from "./SortOptions";
import PokemonTable from "./PokemonTable";
import Footer from "./Footer";

// Homeview page of the Pokémon app
const HomeView = ({ screenSize }) => {
  const [typesResults, setTypesResult] = useState([]);
  const [filterByGen, setFilterByGen] = useState("all");
  const [filterByType, setFilterByType] = useState("all");
  const [sortBy, setSortBy] = useState("number");

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

  return (
    <div className={`homeview-container ${containerSize}`}>
      <Title screenSize={screenSize} />
      <SearchBar />
      <TypeseTable screenSize={screenSize} typesResults={typesResults} />
      <SortOptions
        screenSize={screenSize}
        filterByGen={filterByGen}
        setFilterByGen={setFilterByGen}
        filterByType={filterByType}
        setFilterByType={setFilterByType}
        typesResults={typesResults}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <PokemonTable
        screenSize={screenSize}
        filterByGen={filterByGen}
        filterByType={filterByType}
        sortBy={sortBy}
      />
      <Footer />
    </div>
  );
};

export default HomeView;

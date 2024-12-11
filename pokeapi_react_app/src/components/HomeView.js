import { useState, useEffect } from "react";
import Title from "./Title";
import SearchBar from "./SearchBar";
import TypeseTable from "./TypesTable";
import SortOptions from "./SortOptions";
import PokemonTable from "./PokemonTable";
import Footer from "./Footer";

// Homeview page of the Pokémon app
const HomeView = () => {
  const [screenSize, setscreenSize] = useState("large");
  const [typesResults, setTypesResult] = useState([]);
  const [filterByGen, setFilterByGen] = useState("all");
  const [filterByType, setFilterByType] = useState("all");
  const [sortBy, setSortBy] = useState("number");

  // Check screen size to see if types table should collapse
  useEffect(() => {
    const handleScreenResize = () => {
      // Handle small screen
      if (window.innerWidth < 576) {
        setscreenSize("small");
      }

      // Handle medium screen
      else if (window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium");
      }

      // Handle large screen
      else {
        setscreenSize("large");
      }
    };

    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

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

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import HomeView from "./components/HomeView/HomeView";
import TypeView from "./components/TypeView/TypeView";
import PokeView from "./components/PokeView/PokeView";
import NotFoundView from "./components/NotFoundView/NotFoundView";
import "./App.css";

function App() {
  // Variables to be passed around to different views
  const [fullPokeResults, setFullPokeResults] = useState([]);
  const [pokeResults, setPokeResults] = useState([]);
  const [isPokeResultsLoading, setIsPokeResultsLoading] = useState(false);
  const [whosThatPokemon, setWhosThatPokemon] = useState(false);
  const [typesResults, setTypesResult] = useState([]);
  const [isTypesResultsLoading, setIsTypesResultsLoading] = useState(false);
  const [pokeCountTotal, setPokeCountTotal] = useState(1025);
  const [filterByGen, setFilterByGen] = useState(["all"]);
  const [filterByType, setFilterByType] = useState(["all"]);
  const [sortBy, setSortBy] = useState("number");
  const [screenSize, setscreenSize] = useState("large");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Check screen size and orientation to see if types table should collapse (small, medium, large, x-large)
  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth < 576) {
        setscreenSize("small");
      } else if (window.innerWidth >= 576 && window.innerWidth < 992) {
        setscreenSize("medium");
      } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
        setscreenSize("large");
      } else {
        setscreenSize("x-large");
      }
    };

    // Create the debounced version of the resize function
    const debouncedResize = debounce(handleScreenResize, 300);

    // Initial screen size check
    handleScreenResize();

    // Add event listeners for resize and orientationchange
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", debouncedResize);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", debouncedResize);
    };
  }, []);

  // Check if the user is in dark mode or not
  useEffect(() => {
    // Check the user's preference on initial render
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDarkMode);

    // Watch for changes in the user's preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
    });

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", () => {});
  }, []);

  // Fetch the Pokémon information for all Pokémon as soon as the page is loaded
  useEffect(() => {
    const fetchData = async () => {
      setIsPokeResultsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/?limit=5000`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const updatedPokemonNames = data.results.map((pokemon) => ({
          ...pokemon,
          name: pokemon.name.replace(/-/g, " "),
        }));
        setFullPokeResults(updatedPokemonNames);
        setPokeCountTotal(data.count);
      } catch (error) {
        console.error("Error occurred:", error);
        navigate("/notfound");
      } finally {
        setIsPokeResultsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Fetch the Pokémon types
  useEffect(() => {
    const fetchData = async () => {
      setIsTypesResultsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/type/?limit=-1`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setTypesResult(jsonData.results);
      } catch (error) {
        console.error("Error occurred:", error);
        navigate("/notfound");
      } finally {
        setIsTypesResultsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Provide routing for pages within the application
  return (
    <div className={`${isDarkMode ? "background-dark" : "background-light"}`}>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <HomeView
              pokeResults={pokeResults}
              setPokeResults={setPokeResults}
              whosThatPokemon={whosThatPokemon}
              setWhosThatPokemon={setWhosThatPokemon}
              isPokeResultsLoading={isPokeResultsLoading}
              typesResults={typesResults}
              isTypesResultsLoading={isTypesResultsLoading}
              fullPokeResults={fullPokeResults}
              pokeCountTotal={pokeCountTotal}
              filterByGen={filterByGen}
              setFilterByGen={setFilterByGen}
              filterByType={filterByType}
              setFilterByType={setFilterByType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/types/:id"
          element={
            <TypeView
              pokeResults={pokeResults}
              setPokeResults={setPokeResults}
              setWhosThatPokemon={setWhosThatPokemon}
              typesResults={typesResults}
              fullPokeResults={fullPokeResults}
              pokeCountTotal={pokeCountTotal}
              filterByGen={filterByGen}
              setFilterByGen={setFilterByGen}
              sortBy={sortBy}
              setSortBy={setSortBy}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <PokeView
              fullPokeResults={fullPokeResults}
              whosThatPokemon={whosThatPokemon}
              setWhosThatPokemon={setWhosThatPokemon}
              typesResults={typesResults}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="/notfound"
          element={
            <NotFoundView
              fullPokeResults={fullPokeResults}
              setWhosThatPokemon={setWhosThatPokemon}
              typesResults={typesResults}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFoundView
              fullPokeResults={fullPokeResults}
              setWhosThatPokemon={setWhosThatPokemon}
              typesResults={typesResults}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
            />
          }
        />
      </Routes>
    </div>
  );
}
export default App;

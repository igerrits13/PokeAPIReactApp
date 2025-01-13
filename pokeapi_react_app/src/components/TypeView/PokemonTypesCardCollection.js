import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PokemonCardCollection from "../CommonComponents/PokemonCardCollection";

// Display Pokémon of the specified type for the types view page
const PokemonTypesCardCollection = ({
  pokeResults,
  setPokeResults,
  typeData,
  setTypeData,
  pokeCountTotal,
  filterByGen,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
  // Get the id of the type and setup the loading state for the API call
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data for the current type
  useEffect(() => {
    // If the type searched for is not a valid ID, redirect to page not found
    if (id >= 19 || isNaN(id)) {
      navigate("/notfound");
      return;
    }
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
        setIsLoading(false);
      });
  }, [id, setTypeData, navigate]);

  // If not all gens are selected, fetch the Pokémon information from the requested gen
  useEffect(() => {
    if (filterByGen !== "all") {
      fetch(`https://pokeapi.co/api/v2/generation/${filterByGen}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.pokemon_species);
          setIsLoading(false);
        });
    }
  }, [filterByGen, setPokeResults]);

  // Create Pokémon cards for Pokémon of the current type
  let commonElements = new Array(0);

  if (!isLoading) {
    typeData.pokemon.forEach((obj) => {
      const urlArr = obj.pokemon.url.split("/");
      const urlNoSlash = urlArr.filter((part) => part !== "");
      const urlNumber = urlNoSlash[urlNoSlash.length - 1];
      if (urlNumber <= pokeCountTotal) {
        commonElements.push(obj.pokemon);
      }
    });
    // If a gen is selected, get the common elements between the current type and current gen
    if (filterByGen !== "all") {
      const genSet = new Set(commonElements.map((item) => item.name));
      commonElements = pokeResults.filter((value) => genSet.has(value.name));
    }
  }

  // Display all type cards
  return (
    <PokemonCardCollection
      commonElements={commonElements}
      sortBy={sortBy}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />
  );
};

export default PokemonTypesCardCollection;

import { useEffect } from "react";
import PokemonCardCollection from "../CommonComponents/PokemonCardCollection";

// Display Pokémon of the specified type for the types view page
const PokemonTypesCardCollection = ({
  pokeResults,
  setPokeResults,
  typeData,
  isTypesLoading,
  setIsTypesLoading,
  pokeCountTotal,
  filterByGen,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
  // If not all gens are selected, fetch the Pokémon information from the requested gen
  useEffect(() => {
    if (filterByGen !== "all") {
      fetch(`https://pokeapi.co/api/v2/generation/${filterByGen}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.pokemon_species);
          setIsTypesLoading(false);
        });
    }
  }, [filterByGen, setPokeResults, setIsTypesLoading]);

  // Create Pokémon cards for Pokémon of the current type
  let commonElements = new Array(0);

  if (!isTypesLoading) {
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

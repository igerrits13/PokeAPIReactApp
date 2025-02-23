import { useEffect } from "react";
import PokemonCardCollection from "../../CommonComponents/PokemonCardComponents/PokemonCardCollection";

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
  // Fetch the Pokémon information from the requested gens if user has specified gens
  useEffect(() => {
    if (filterByGen[0] !== "all") {
      setIsTypesLoading(true);
      const fetchGenData = filterByGen.map((gen) => {
        return fetch(`https://pokeapi.co/api/v2/generation/${gen}/`)
          .then((response) => response.json())
          .then((data) => data.pokemon_species);
      });
      Promise.all(fetchGenData)
        .then((results) => {
          const allPokemon = results.flat();
          setPokeResults(allPokemon);
          setIsTypesLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching generation data:", error);
          setIsTypesLoading(false);
        });
    }
  }, [filterByGen, setPokeResults, setIsTypesLoading]);

  // Get the current Pokémons number from their url
  const getPokeNum = (pokeURL) => {
    // Seperate out the integer from the url
    const urlArr = pokeURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

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
    if (filterByGen[0] !== "all") {
      const genSet = new Set(
        commonElements.map((item) => getPokeNum(item.url))
      );
      commonElements = pokeResults.filter((value) => {
        return genSet.has(getPokeNum(value.url));
      });
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

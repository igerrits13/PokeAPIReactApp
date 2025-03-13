import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonCardCollection from "../../CommonComponents/PokemonCardComponents/PokemonCardCollection";

// Display Pokémon of the specified type for the types view page
const PokemonTypesCardCollection = ({
  pokeResults,
  setPokeResults,
  typeData,
  pokeCountTotal,
  filterByGen,
  sortBy,
  sortOptions,
  screenSize,
  isDarkMode,
  callCount,
  setCallCount,
}) => {
  const [isTypesLoading, setIsTypesLoading] = useState(true);

  // Fetch the Pokémon information from all gens
  const fetchTypeAllGen = async () => {
    setCallCount((prev) => prev + 1);
    console.log(`Fetching Pokémon cards data all gens: ${callCount}`);
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=5000"
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  };

  // Query the data for all gens
  const {
    data: allTypeData,
    isLoading: allTypeIsLoading,
    error: allTypeError,
  } = useQuery({
    queryKey: ["allTypeCards"],
    queryFn: fetchTypeAllGen,
    enabled: filterByGen[0] === "all",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch the Pokémon information from the selected gens
  const fetchTypeByGen = async () => {
    setCallCount((prev) => prev + 1);
    console.log(
      `Fetching Pokémon cards data some gens: ${callCount} - ${filterByGen}`
    );
    const results = await Promise.all(
      filterByGen.map(async (gen) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/generation/${gen}/`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.pokemon_species;
      })
    );
    return results.flat();
  };

  // Query the data for the selected gens
  const {
    data: genTypeData,
    isLoading: genTypeIsLoading,
    error: genTypeError,
  } = useQuery({
    queryKey: ["genTypeCards", filterByGen],
    queryFn: fetchTypeByGen,
    enabled: filterByGen[0] !== "all",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (allTypeData?.results && filterByGen[0] === "all") {
      setPokeResults(allTypeData.results);
      setIsTypesLoading(allTypeIsLoading);
    } else if (genTypeData && filterByGen[0] !== "all") {
      setPokeResults(genTypeData);
      setIsTypesLoading(genTypeIsLoading);
    }
  }, [
    setPokeResults,
    allTypeData,
    genTypeData,
    filterByGen,
    allTypeIsLoading,
    genTypeIsLoading,
  ]);

  if (allTypeError || genTypeError) {
    console.error("Error occurred:", allTypeError || genTypeError);
  }

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
      sortOptions={sortOptions}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />
  );
};

export default PokemonTypesCardCollection;

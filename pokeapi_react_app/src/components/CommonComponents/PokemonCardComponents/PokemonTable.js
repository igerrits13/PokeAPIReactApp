import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonCardCollection from "./PokemonCardCollection";

// Table displaying all Pokémon
const PokemonTable = ({
  pokeResults,
  setPokeResults,
  screenSize,
  pokeCountTotal,
  filterByGen,
  filterByType,
  sortBy,
  sortOptions,
  isDarkMode,
  callCount,
  setCallCount,
}) => {
  // Create states to keep track of what Pokémon cards are to be displayed given the current filters
  const [pokeTypes, setPokeTypes] = useState([]);

  // Fetch the information for all Pokémon cards if no gen is selected
  const fetchAllPokemon = async () => {
    setCallCount((prev) => prev + 1);
    console.log("Fetching Pokémon cards data all gens: ", callCount);
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=5000"
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
    };
  };

  // Query the data for all Pokémon species
  const { data: allPokemonData, error: allPokemonError } = useQuery({
    queryKey: ["allPokemonSpecies"],
    queryFn: fetchAllPokemon,
    enabled: filterByGen[0] === "all",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Otherwise, fetch the Pokémon information from the requested gens
  const fetchPokemonByGen = async () => {
    setCallCount((prev) => prev + 1);
    console.log(
      "Fetching Pokémon cards data some gens: ",
      callCount,
      " - ",
      filterByGen
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

  // Query the data for Pokémon species within the specified gens
  const { data: genPokemon, error: genPokemonError } = useQuery({
    queryKey: ["pokemonSpecies", filterByGen],
    queryFn: fetchPokemonByGen,
    enabled: filterByGen[0] !== "all",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (allPokemonData?.results && filterByGen[0] === "all") {
      setPokeResults(allPokemonData.results);
    } else if (genPokemon && filterByGen[0] !== "all") {
      setPokeResults(genPokemon);
    }
  }, [allPokemonData, genPokemon, filterByGen, setPokeResults]);

  // If types are selected, fetch the Pokémon information of the requested types
  const fetchPokemonByType = async () => {
    setCallCount((prev) => prev + 1);
    console.log(
      "Fetching Pokémon cards data some types: ",
      callCount,
      " - ",
      filterByType
    );
    const alreadyFetched = new Set();
    const results = await Promise.all(
      filterByType.map(async (type) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.pokemon.filter((pokemon) => {
          const testInfo = pokemon.pokemon.name + pokemon.pokemon.url;
          if (!alreadyFetched.has(testInfo)) {
            alreadyFetched.add(testInfo);
            return true;
          }
          return false;
        });
      })
    );
    return results.flat();
  };

  // Query the data for Pokémon species within the specified types
  const { data: typePokemon, error: typePokemonError } = useQuery({
    queryKey: ["pokemonSpecies", filterByType],
    queryFn: fetchPokemonByType,
    enabled: filterByType[0] !== "all",
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (typePokemon && filterByType[0] !== "all") {
      setPokeTypes(typePokemon);
    }
  }, [typePokemon, filterByType]);

  // Handle errors
  if (allPokemonError || genPokemonError || typePokemonError) {
    console.error(
      "Error occurred:",
      allPokemonError || genPokemonError || typePokemonError
    );
  }

  // Create a set of Pokémon of the current type and use set to prevent duplicates
  let commonElementsSet = new Set();

  if (filterByType[0] !== "all") {
    for (const element of pokeTypes) {
      for (const element2 of pokeResults) {
        const pokeName = element2.name;
        const urlArr = element.pokemon.url.split("/");
        const urlNoSlash = urlArr.filter((part) => part !== "");
        const urlNumber = urlNoSlash[urlNoSlash.length - 1];
        if (
          element.pokemon.name.includes(pokeName) &&
          urlNumber <= pokeCountTotal
        ) {
          commonElementsSet.add(element.pokemon);
        }
      }
    }
  }

  // Convert the set back to an array of all the Pokémon that are to be displayed
  let commonElements;

  if (filterByType[0] !== "all") {
    commonElements = Array.from(commonElementsSet);
  } else {
    commonElements = Array.from(pokeResults);
  }

  // Create a display for showing the Pokémon that fit the filters and have been sorted.
  // These Pokémon will load in using infinite scrolling
  const cardsHTML = (
    <PokemonCardCollection
      commonElements={commonElements}
      sortBy={sortBy}
      sortOptions={sortOptions}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />
  );

  return <div>{cardsHTML}</div>;
};

export default PokemonTable;

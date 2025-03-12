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

  // Fetch the Pokémon information for all Pokémon cards if no gen is selected
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

  const { data: allPokemonData, error: allPokemonError } = useQuery({
    queryKey: ["allPokemonSpecies"],
    queryFn: fetchAllPokemon,
    enabled: filterByGen[0] === "all",
    staleTime: Infinity,
    cacheTime: Infinity,
    // onSuccess: (speciesData) => {
    //   console.log("Success!");
    //   console.log(speciesData.results);
    //   setFullPokeResults(speciesData.results);
    //   setPokeCountTotal(speciesData.count);
    //   setCallCount((prev) => {
    //     const newCount = prev + 1;
    //     console.log("Fetching all species: ", newCount);
    //     return newCount;
    //   });
    // },
    // onSettled: () => setIsPokeResultsLoading(false),
  });

  // useEffect(() => {
  //   if (allSpeciesData?.results && filterByGen[0] === "all") {
  //     setPokeResults(allSpeciesData.results);
  //   }
  // }, [allSpeciesData, filterByGen]);
  // useEffect(() => {
  //   if (filterByGen[0] === "all") {
  //     setCallCount(callCount + 1);
  //     console.log("Fetching Pokémon cards data all gens: ", callCount);
  //     fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setPokeResults(data.results);
  //       });
  //   }
  // }, [filterByGen, setPokeResults]);

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

  const { data: genPokemon, error: genPokemonError } = useQuery({
    queryKey: ["pokemonSpecies", filterByGen],
    queryFn: fetchPokemonByGen,
    enabled: filterByGen[0] !== "all", // Only fetch if a specific generation is selected
    staleTime: Infinity,
    cacheTime: Infinity,
    // onSuccess: (data) => setPokeResults(data),
  });

  useEffect(() => {
    if (allPokemonData?.results && filterByGen[0] === "all") {
      setPokeResults(allPokemonData.results);
    } else if (genPokemon && filterByGen[0] !== "all") {
      setPokeResults(genPokemon);
    }
  }, [allPokemonData, genPokemon, filterByGen]);

  // useEffect(() => {
  //   if (filterByGen[0] !== "all") {
  //     const fetchGenData = filterByGen.map((gen) => {
  //       setCallCount(callCount + 1);
  //       console.log("Fetching Pokémon cards data some gens: ", callCount);
  //       return fetch(`https://pokeapi.co/api/v2/generation/${gen}/`)
  //         .then((response) => response.json())
  //         .then((data) => data.pokemon_species);
  //     });
  //     Promise.all(fetchGenData)
  //       .then((results) => {
  //         const allPokemon = results.flat();
  //         setPokeResults(allPokemon);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching generation data:", error);
  //       });
  //   }
  // }, [filterByGen, setPokeResults]);

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

  const { data: typePokemon, error: typePokemonError } = useQuery({
    queryKey: ["pokemonSpecies", filterByType],
    queryFn: fetchPokemonByType,
    enabled: filterByType[0] !== "all", // Only fetch if a specific type is selected
    staleTime: Infinity,
    cacheTime: Infinity,
    // onSuccess: (data) => setPokeTypes(data),
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
  // useEffect(() => {
  //   if (filterByType[0] !== "all") {
  //     setCallCount(callCount + 1);
  //     console.log("Fetching Pokémon cards data some types: ", callCount);
  //     const alreadyFetched = new Set();
  //     const fetchTypeData = filterByType.map((type) =>
  //       fetch(`https://pokeapi.co/api/v2/type/${type}/`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           return data.pokemon.filter((pokemon) => {
  //             const testInfo = pokemon.pokemon.name + pokemon.pokemon.url;
  //             if (!alreadyFetched.has(testInfo)) {
  //               alreadyFetched.add(testInfo);
  //               return true;
  //             }
  //             return false;
  //           });
  //         })
  //     );

  //     Promise.all(fetchTypeData)
  //       .then((results) => {
  //         const allPokemon = results.flat();
  //         setPokeTypes(allPokemon);
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching type data:", error);
  //       });
  //   }
  // }, [filterByType]);

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

import React, { useState, useEffect } from "react";
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
  isDarkMode,
}) => {
  // Create states to keep track of what Pokémon cards are to be displayed given the current filters
  // const [pokeResults, setPokeResults] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);

  // Fetch the Pokémon information for all Pokémon cards if no gen is selected
  useEffect(() => {
    if (filterByGen[0] === "all") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.results);
        });
    }
  }, [filterByGen, setPokeResults]);

  // Otherwise, fetch the Pokémon information from the requested gen
  useEffect(() => {
    if (filterByGen[0] !== "all") {
      const fetchGenData = filterByGen.map((gen) => {
        return fetch(`https://pokeapi.co/api/v2/generation/${gen}/`)
          .then((response) => response.json())
          .then((data) => data.pokemon_species);
      });
      Promise.all(fetchGenData)
        .then((results) => {
          const allPokemon = results.flat();
          setPokeResults(allPokemon);
        })
        .catch((error) => {
          console.error("Error fetching generation data:", error);
        });
    }
  }, [filterByGen, setPokeResults]);

  // If a type is selected, fetch the Pokémon information of the requested type
  useEffect(() => {
    if (filterByType[0] !== "all") {
      const fetchTypeData = filterByType.map((type) => {
        return fetch(`https://pokeapi.co/api/v2/type/${type}/`)
          .then((response) => response.json())
          .then((data) => data.pokemon);
      });
      Promise.all(fetchTypeData)
        .then((results) => {
          const allPokemon = results.flat();
          const allPokemonNoDuplicates = allPokemon.filter(
            (pokemon, i, arr) =>
              i ===
              arr.findIndex(
                (currPokemon) =>
                  currPokemon.pokemon.name === pokemon.pokemon.name ||
                  currPokemon.pokemon.url === pokemon.pokemon.url
              )
          );
          setPokeTypes(allPokemonNoDuplicates);
        })
        .catch((error) => {
          console.log("Error fetching type data:", error);
        });
    }
  }, [filterByType]);

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
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />
  );

  return <div>{cardsHTML}</div>;
};

export default PokemonTable;

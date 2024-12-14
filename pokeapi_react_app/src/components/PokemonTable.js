import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

// Table showing Pokémon cards
const PokemonTable = ({ screenSize, filterByGen, filterByType, sortBy }) => {
  const [pokeResults, setPokeResults] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);

  // Fetch the Pokémon information for all Pokémon cards if no gen is selected
  useEffect(() => {
    if (filterByGen === "all") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.results);
        });
    }
  }, [filterByGen]);

  // Fetch the Pokémon information from the requested gen
  useEffect(() => {
    if (filterByGen !== "all") {
      fetch(`https://pokeapi.co/api/v2/generation/${filterByGen}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.pokemon_species);
        });
    }
  }, [filterByGen]);

  // Fetch the Pokémon information of the requested type
  useEffect(() => {
    if (filterByType !== "all") {
      fetch(`https://pokeapi.co/api/v2/type/${filterByType}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeTypes(data.pokemon);
        });
    }
  }, [filterByType]);

  // Create a set of Pokémon in the current gen and of the current type to prevent duplicates
  let commonElementsSet = new Set();
  for (const element of pokeTypes) {
    for (const element2 of pokeResults) {
      const pokeName = element2.name;
      if (element.pokemon.name.includes(pokeName)) {
        commonElementsSet.add(element.pokemon);
      }
    }
  }
  // Then convert back to an array
  const commonElements = Array.from(commonElementsSet);

  // Create a card for each Pokémon
  const cardsHTML = pokeResults.map((obj, i) => {
    // Seperate out the integer from the url
    const urlArr = obj.url.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    const pokeNum = parseInt(urlNumber, 10);
    return <PokemonCard key={i} obj={obj} i={pokeNum} />;
  });

  // Create a card for each Pokémon based on type
  const pokeTypesHTML = commonElements.map((obj, i) => {
    const urlArr = obj.url.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    const pokeNum = parseInt(urlNumber, 10);
    return <PokemonCard key={i} obj={obj} i={pokeNum} />;
  });

  // Compare used for sorting the pokemon by number
  let compareNum = (a, b) => {
    if (cardsHTML[Number(a.key)].props.i < cardsHTML[Number(b.key)].props.i) {
      return -1;
    }
    if (cardsHTML[Number(a.key)].props.i > cardsHTML[Number(b.key)].props.i) {
      return 1;
    }
    return 0;
  };

  // Compare used for sorting the pokemon by name
  let compareName = (a, b) => {
    if (
      cardsHTML[Number(a.key)].props.obj.name <
      cardsHTML[Number(b.key)].props.obj.name
    ) {
      return -1;
    }
    if (
      cardsHTML[Number(a.key)].props.obj.name >
      cardsHTML[Number(b.key)].props.obj.name
    ) {
      return 1;
    }
    return 0;
  };

  // Compare used for sorting the pokemon by number
  let compareNumTypes = (a, b) => {
    if (
      pokeTypesHTML[Number(a.key)].props.i <
      pokeTypesHTML[Number(b.key)].props.i
    ) {
      return -1;
    }
    if (
      pokeTypesHTML[Number(a.key)].props.i >
      pokeTypesHTML[Number(b.key)].props.i
    ) {
      return 1;
    }
    return 0;
  };

  // Compare used for sorting the pokemon by name
  let compareNameTypes = (a, b) => {
    if (
      pokeTypesHTML[Number(a.key)].props.obj.name <
      pokeTypesHTML[Number(b.key)].props.obj.name
    ) {
      return -1;
    }
    if (
      pokeTypesHTML[Number(a.key)].props.obj.name >
      pokeTypesHTML[Number(b.key)].props.obj.name
    ) {
      return 1;
    }
    return 0;
  };

  // Sort the cards based on name or number
  if (sortBy === "number") {
    cardsHTML.sort(compareNum);
    pokeTypesHTML.sort(compareNumTypes);
  } else if (sortBy === "name") {
    cardsHTML.sort(compareName);
    pokeTypesHTML.sort(compareNameTypes);
  }

  // Set the Pokémon container to appropriate size based on viewport width
  if (screenSize === "small") {
    return (
      <div className="pokemon-container-small">
        {filterByType === "all" ? cardsHTML : pokeTypesHTML}
      </div>
    );
  } else if (screenSize === "medium") {
    return (
      <div className="pokemon-container-med">
        {filterByType === "all" ? cardsHTML : pokeTypesHTML}
      </div>
    );
  } else {
    return (
      <div className="pokemon-container-large">
        {filterByType === "all" ? cardsHTML : pokeTypesHTML}
      </div>
    );
  }
};

export default PokemonTable;

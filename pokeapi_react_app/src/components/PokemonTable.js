import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

// Table showing Pokémon cards
const PokemonTable = ({ screenSize, filterByGen, filterByType, sortBy }) => {
  const [pokeResults, setPokeResults] = useState([]);

  // Fetch the Pokémon information for cards
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
      .then((response) => response.json())
      .then((data) => {
        setPokeResults(data.results);
      });
  }, []);

  // Create a card for each Pokémon
  const cardsHTML = pokeResults.map((obj, i) => {
    return <PokemonCard key={i} obj={obj} i={i} />;
  });

  // Compare used for sorting the pokemon by number
  let compareNum = (a, b) => {
    if (Number(a.key) < Number(b.key)) {
      return -1;
    }
    if (Number(a.key) > Number(b.key)) {
      return 1;
    }
    return 0;
  };

  // Compare used for sorting the pokemon by name
  let compareName = (a, b) => {
    if (pokeResults[Number(a.key)].name < pokeResults[Number(b.key)].name) {
      return -1;
    }
    if (pokeResults[Number(a.key)].name > pokeResults[Number(b.key)].name) {
      return 1;
    }
    return 0;
  };

  // Sort the cards based on name or number
  if (sortBy === "number") {
    cardsHTML.sort(compareNum);
  } else if (sortBy === "name") {
    cardsHTML.sort(compareName);
  }

  // Set the Pokémon container to appropriate size based on viewport width
  if (screenSize === "small") {
    return <div className="pokemon-container-small">{cardsHTML}</div>;
  } else if (screenSize === "medium") {
    return <div className="pokemon-container-med">{cardsHTML}</div>;
  } else {
    return <div className="pokemon-container-large">{cardsHTML}</div>;
  }
};

export default PokemonTable;

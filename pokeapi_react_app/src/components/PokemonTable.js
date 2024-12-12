import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

// Table showing Pokémon cards
const PokemonTable = ({ screenSize, filterByGen, filterByType, sortBy }) => {
  const [pokeResults, setPokeResults] = useState([]);

  // Fetch the Pokémon information for cards
  useEffect(() => {
    if (filterByGen === "all" && filterByType === "all") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.results);
        });
    }
  }, [filterByGen, filterByType]);

  // Fetch the Pokémon information from requested gen
  useEffect(() => {
    // console.log(`Filter by gen changed to ${filterByGen}`);
    if (filterByGen !== "all") {
      fetch(`https://pokeapi.co/api/v2/generation/${filterByGen}/`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setPokeResults(data.pokemon_species);
          // console.log(pokeResults);
        });
    }
  }, [filterByGen]);

  // Fetch the Pokémon information of requested type
  // useEffect(() => {
  //   if (filterByType !== "all") {
  //     const typeNum = Number(filterByType) + 1;
  //     fetch(`https://pokeapi.co/api/v2/type/${typeNum}/`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         // setPokeResults(data.pokemon);
  //       });
  //   }
  // }, [filterByType]);

  // Create a card for each Pokémon
  const cardsHTML = pokeResults.map((obj, i) => {
    // Seperate out the integer from the url
    const urlArr = obj.url.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    const pokeNum = parseInt(urlNumber, 10);
    return <PokemonCard key={i} obj={obj} i={pokeNum} />;
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

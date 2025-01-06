import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBall from "./LoadingBall";
import PokemonCard from "./PokemonCard";

// Table displaying all Pokémon
const PokemonTable = ({
  screenSize,
  setFullPokeResults,
  filterByGen,
  filterByType,
  sortBy,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  // Create states to keep track of what Pokémon cards are to be displayed given the current filters
  const [pokeResults, setPokeResults] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeCountTotal, setPokeCountTotal] = useState(0);
  const [cardsToDisplay, setCardsToDisplay] = useState(24);

  // Fetch the Pokémon information for all Pokémon cards if no gen is selected
  useEffect(() => {
    // If no gen is specified, collect data for all gens
    if (filterByGen === "all") {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
        .then((response) => response.json())
        .then((data) => {
          setPokeResults(data.results);
          setFullPokeResults(data.results);
          setPokeCountTotal(data.count);
        });
    }
  }, [filterByGen, setFullPokeResults]);

  // Fetch the Pokémon information from the requested gen
  useEffect(() => {
    // Otherwise, only collect data for specified gen
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
    // Only collect data for a specific type if one is selected
    if (filterByType !== "all") {
      fetch(`https://pokeapi.co/api/v2/type/${filterByType}/`)
        .then((response) => response.json())
        .then((data) => {
          setPokeTypes(data.pokemon);
        });
    }
  }, [filterByType]);

  // Create a set of Pokémon of the current type and use set to prevent duplicates
  let commonElementsSet = new Set();

  if (filterByType !== "all") {
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

  if (filterByType !== "all") {
    commonElements = Array.from(commonElementsSet);
  } else {
    commonElements = Array.from(pokeResults);
  }

  // Create a card for each Pokémon
  const cardsHTML = commonElements.map((obj, i) => {
    // Seperate out the integer from the url
    const urlArr = obj.url.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    const pokeNum = parseInt(urlNumber, 10);
    return (
      <PokemonCard key={i} obj={obj} i={pokeNum} isDarkMode={isDarkMode} />
    );
  });

  // Update how many cards are to be displayed
  const fetchMoreData = () => {
    setCardsToDisplay(cardsToDisplay + 24);
  };

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

  // Sort the cards based on name or number
  if (sortBy === "number") {
    cardsHTML.sort(compareNum);
  } else if (sortBy === "name") {
    cardsHTML.sort(compareName);
  }

  // Create a display for showing the full Pokémon table that will load in using infinite scrolling
  return (
    <div>
      <div className={`sub-header ${fontStyle}`}>
        Pokémon ({cardsHTML.length})
      </div>
      <InfiniteScroll
        dataLength={cardsToDisplay}
        next={fetchMoreData}
        hasMore={cardsToDisplay < commonElements.length}
        loader={
          <div className="loading-ball-container">
            <LoadingBall />
          </div>
        }
        style={{ overflow: "hidden" }}
      >
        {/* Set the Pokémon container to appropriate size based on viewport width */}
        <div
          className={
            screenSize === "small"
              ? "pokemon-container-small"
              : screenSize === "medium"
              ? "pokemon-container-med"
              : "pokemon-container-large"
          }
        >
          {cardsHTML.slice(0, cardsToDisplay)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonTable;

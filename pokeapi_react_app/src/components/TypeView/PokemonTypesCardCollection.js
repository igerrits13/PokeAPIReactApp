import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonCardCollection from "../CommonComponents/PokemonCardCollection";

// Display Pokémon of the specified type for the types view page
const PokemonTypesCardCollection = ({
  typeData,
  setTypeData,
  pokeCountTotal,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
  // Get the id of the type and setup the loading state for the API call
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data for the current type
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
        setIsLoading(false);
      });
  }, [id, setTypeData]);

  // Construct an array of cards to be displayed once API call has finished loading
  const commonElements = new Array(0);

  if (!isLoading) {
    typeData.pokemon.forEach((obj) => {
      const urlArr = obj.pokemon.url.split("/");
      const urlNoSlash = urlArr.filter((part) => part !== "");
      const urlNumber = urlNoSlash[urlNoSlash.length - 1];
      if (urlNumber <= pokeCountTotal) {
        commonElements.push(obj.pokemon);
      }
    });
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

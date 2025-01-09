import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonCardCollection from "../CommonComponents/PokemonCardCollection";

const PokemonTypesCardCollection = ({
  typeData,
  setTypeData,
  pokeCountTotal,
  sortBy,
  screenSize,
  isDarkMode,
}) => {
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

  // Create a set of Pokémon of the current type and use set to prevent duplicates
  let commonElementsSet = new Set();

  if (!isLoading) {
    for (const element of typeData.pokemon) {
      const urlArr = element.pokemon.url.split("/");
      const urlNoSlash = urlArr.filter((part) => part !== "");
      const urlNumber = urlNoSlash[urlNoSlash.length - 1];
      if (urlNumber <= pokeCountTotal) {
        commonElementsSet.add(element.pokemon);
      }
    }
  }

  // Convert the set back to an array of all the Pokémon that are to be displayed
  let commonElements;

  commonElements = Array.from(commonElementsSet);

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

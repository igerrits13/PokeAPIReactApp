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

  // Create a set of Pokémon of the current type and use set to prevent duplicates
  // let commonElementsSet = new Set();

  // // If
  // if (!isLoading) {
  //   for (const element of typeData.pokemon) {
  //     const urlArr = element.pokemon.url.split("/");
  //     const urlNoSlash = urlArr.filter((part) => part !== "");
  //     const urlNumber = urlNoSlash[urlNoSlash.length - 1];
  //     if (urlNumber <= pokeCountTotal) {
  //       commonElementsSet.add(element.pokemon);
  //     }
  //   }
  // }

  // // Convert the set back to an array of all the Pokémon that are to be displayed
  // let commonElements;

  // commonElements = Array.from(commonElementsSet);

  // const commonElements = typeData.pokemon.map((obj, i) => {
  //   commonElements.push(obj.pokemon);
  // });

  const commonElements = new Array(0);

  if (!isLoading) {
    typeData.pokemon.map((obj, i) => {
      const urlArr = obj.pokemon.url.split("/");
      const urlNoSlash = urlArr.filter((part) => part !== "");
      const urlNumber = urlNoSlash[urlNoSlash.length - 1];
      console.log(urlNumber + "  " + pokeCountTotal);
      if (urlNumber <= pokeCountTotal) {
        commonElements.push(obj.pokemon);
      }
    });
  }

  return (
    // <></>
    <PokemonCardCollection
      commonElements={commonElements}
      sortBy={sortBy}
      screenSize={screenSize}
      isDarkMode={isDarkMode}
    />
  );
};

export default PokemonTypesCardCollection;

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EvolutionChainTable from "./EvolutionChainTable";

// Current Pokémon's evolution chain
const EvolutionChain = ({
  pokeSpeciesData,
  pokeChainURL,
  whosThatPokemon,
  setBabyTriggerItem,
  setLevel,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font style, header style, and line style between information sections based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Setup data structures to contain the current Pokéchain data, its loading and error state and navigation
  const [pokeChainData, setPokeChainData] = useState(null);
  const [isPokeChainLoading, setIsPokeChainLoading] = useState(true);

  // Fetch data for the current Pokémon's chain
  const fetchEvoInfo = async () => {
    const response = await fetch(`${pokeChainURL}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  };

  // Query the data for the current Pokémon's evolution chain
  const { data, isLoading, error } = useQuery({
    queryKey: ["evoInfo", pokeChainURL],
    queryFn: fetchEvoInfo,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setPokeChainData(data);
      setBabyTriggerItem(data.baby_trigger_item);
      setIsPokeChainLoading(isLoading);
    }
  }, [data, isLoading, setBabyTriggerItem]);

  if (error) {
    console.error("Error occured:", error);
  }

  // Display the full evolution chain for the current Pokémon species including cards and evolution details
  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        Evolution Chain
      </div>
      {!isPokeChainLoading && (
        <EvolutionChainTable
          pokeSpeciesData={pokeSpeciesData}
          pokeChainData={pokeChainData}
          whosThatPokemon={whosThatPokemon}
          setLevel={setLevel}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default EvolutionChain;

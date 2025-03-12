import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  callCount,
  setCallCount,
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
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data for the current Pokémon's chain
  const fetchEvoInfo = async () => {
    setCallCount((prev) => prev + 1);
    console.log(`Fetching Pokémon evolution chain: ${callCount}`);
    const response = await fetch(`${pokeChainURL}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  };

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
      setIsPokeChainLoading(isLoading);
    }
  }, [data]);

  if (error) {
    console.error("Error occured:", error);
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setCallCount(callCount + 1);
  //     console.log("Fetching Pokémon evolution chain: ", callCount);
  //     setIsPokeChainLoading(true);
  //     try {
  //       const [response] = await Promise.all([fetch(`${pokeChainURL}`)]);
  //       if (!response) {
  //         return;
  //       }
  //       const jsonData = await response.json();
  //       setBabyTriggerItem(jsonData.baby_trigger_item);
  //       setPokeChainData(jsonData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsPokeChainLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [pokeChainURL, setBabyTriggerItem]);

  // // If the API call returns an error, navigate to the page not found
  // // (Redundant to inside fetch call to avoid compilation error)
  // if (error) {
  //   navigate("/notfound");
  //   return;
  // }

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

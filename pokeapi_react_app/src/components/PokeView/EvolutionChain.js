import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import EvolutionChainHorizontal from "./EvolutionChainHorizontal";
import EvolutionChainVertical from "./EvolutionChainVertical";

// Current Pokémon's evolution chain
const EvolutionChain = ({ pokeChainURL, screenSize, isDarkMode }) => {
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data for the current Pokémon's chain
  useEffect(() => {
    const fetchData = async () => {
      setIsPokeChainLoading(true);
      try {
        const [response] = await Promise.all([fetch(`${pokeChainURL}`)]);
        if (!response) {
          return;
        }
        const jsonData = await response.json();
        setPokeChainData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsPokeChainLoading(false);
      }
    };

    fetchData();
  }, [pokeChainURL]);

  // If the API call returns an error, navigate to the page not found
  // (Redundant to inside fetch call to avoid compilation error)
  if (error) {
    navigate("/notfound");
    return;
  }

  // Display the full evolution chain for the current Pokémon species including cards and evolution details
  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        Evolution Chain
      </div>
      {!isPokeChainLoading && (
        <EvolutionChainVertical
          pokeChainData={pokeChainData}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      )}
      {/* <EvolutionChainHorizontal
        pokeChainData={pokeChainData}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      /> */}
    </>
  );
};

export default EvolutionChain;

import React from "react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainTableSection from "./EvolutionChainTableSection";

const EvolutionChainTable = ({ pokeChainData, screenSize, isDarkMode }) => {
  // Setup the font style, and line style between information sections based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Get the current Pokémons number from their url
  const getPokeNum = (pokeURL) => {
    // Seperate out the integer from the url
    const urlArr = pokeURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

  return (
    //
    <div
      className={`${
        screenSize === "x-large"
          ? "evolution-chain-container-large"
          : "evolution-chain-container-small"
      } ${fontStyle}`}
    >
      <div
        className={`${
          screenSize === "x-large"
            ? "evolution-chain-initial-large"
            : "evolution-chain-initial-small"
        }`}
      >
        <div
          className={`${
            screenSize === "x-large"
              ? "evolution-chain-card-large"
              : "evolution-chain-card-small"
          }`}
        >
          <PokemonCard
            obj={pokeChainData.chain.species}
            i={getPokeNum(pokeChainData.chain.species.url)}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      {/* If there is only one evolution for a specific Pokémon, center it vertically */}
      <div
        className={`${
          screenSize === "x-large"
            ? "evolution-chain-table-large"
            : "evolution-chain-table-small"
        }`}
      >
        <EvolutionChainTableSection
          pokeChainData={pokeChainData}
          getPokeNum={getPokeNum}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default EvolutionChainTable;

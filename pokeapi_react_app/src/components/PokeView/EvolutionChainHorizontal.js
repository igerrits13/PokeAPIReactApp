import React from "react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainHorizontalSection from "./EvolutionChainHorizontalSection";

const EvolutionChainHorizontal = ({
  pokeChainData,
  screenSize,
  isDarkMode,
}) => {
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
    <div className={`evolution-chain-container-horizontal ${fontStyle}`}>
      <div className="evolution-chain-section-horizontal flex-centered">
        <div className="evolution-chain-icon-row">
          <div
            className="evolution-chain-card-large" //     ? //   screenSize === "x-large" // {`${
            //     : "evolution-chain-card-small"
            // }`}
          >
            <PokemonCard
              obj={pokeChainData.chain.species}
              i={getPokeNum(pokeChainData.chain.species.url)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
      {/* If there is only one evolution for a specific Pokémon, center it vertically */}
      <div
        className={`evolution-chain-section-vertical ${
          Object.entries(pokeChainData.chain.evolves_to).length === 1
            ? "flex-centered"
            : ""
        }
            }`}
      >
        <EvolutionChainHorizontalSection
          pokeChainData={pokeChainData}
          getPokeNum={getPokeNum}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default EvolutionChainHorizontal;

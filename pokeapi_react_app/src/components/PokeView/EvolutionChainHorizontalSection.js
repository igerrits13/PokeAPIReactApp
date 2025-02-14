import React from "react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainDetails from "./EvolutionChainDetails";

const EvolutionChainHorizontalSection = ({
  pokeChainData,
  getPokeNum,
  screenSize,
  isDarkMode,
}) => {
  // Recursively get evolutions of the current Pokémon if there are any
  const getEvolutions = (evolutions) => {
    return evolutions.map((evolution, i) => {
      return (
        <div
          className={`evolution-chain-section-horizontal ${
            Object.entries(pokeChainData.chain.evolves_to).length === 1
              ? "flex-centered"
              : ""
          }
              }`}
          key={i}
        >
          <div className="evolution-chain-icon-row">
            <div
              className={`evolution-chain-section-vertical ${
                screenSize === "x-large"
                  ? "evolution-chain-section-details-large"
                  : "evolution-chain-section-details-small"
              }`}
            >
              <EvolutionChainDetails
                evolution={evolution}
                isDarkMode={isDarkMode}
              />
            </div>
            <i className="fa-solid fa-arrow-right-long evolution-chain-image" />
            <div
              className={`${
                screenSize === "x-large"
                  ? "evolution-chain-card-large"
                  : "evolution-chain-card-small"
              }`}
            >
              <PokemonCard
                obj={evolution[1].species}
                i={getPokeNum(evolution[1].species.url)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          {evolution[1].evolves_to && (
            <div
              className={`evolution-chain-section-vertical ${
                Object.entries(pokeChainData.chain.evolves_to).length === 1
                  ? "flex-centered"
                  : ""
              }
            }`}
            >
              {getEvolutions(Object.entries(evolution[1].evolves_to))}
            </div>
          )}
        </div>
      );
    });
  };

  const evolutionHTML = getEvolutions(
    Object.entries(pokeChainData.chain.evolves_to)
  );

  return <> {evolutionHTML}</>;
};

export default EvolutionChainHorizontalSection;

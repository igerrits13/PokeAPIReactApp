import React from "react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainDetails from "./EvolutionChainDetails";

const EvolutionChainVerticalSection = ({
  pokeChainData,
  getPokeNum,
  screenSize,
  isDarkMode,
}) => {
  // Recursively get evolutions of the current Pokémon if there are any
  const getEvolutions = (evolutions) => {
    return (
      <div className="evolution-chain-path-fork-small">
        {evolutions.map((evolution, i) => {
          console.log(evolution);
          return (
            <div className={`evolution-chain-path-small`} key={i}>
              <div className="evolution-chain-path-section-small">
                <EvolutionChainDetails
                  evolution={evolution}
                  isDarkMode={isDarkMode}
                />
                <div>
                  <i className="fa-solid fa-arrow-down-long evolution-chain-image" />
                  <div className={"evolution-chain-card-small"}>
                    <PokemonCard
                      obj={evolution[1].species}
                      i={getPokeNum(evolution[1].species.url)}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
              {evolution[1].evolves_to.length > 0 && (
                <div
                  className={`evolution-chain-path-section-small ${
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
        })}
      </div>
    );
  };

  const evolutionHTML = getEvolutions(
    Object.entries(pokeChainData.chain.evolves_to)
  );

  return <> {evolutionHTML}</>;
};

export default EvolutionChainVerticalSection;

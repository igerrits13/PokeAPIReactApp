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
    return evolutions.map((evolution, i) => {
      return (
        <div className={`evolution-chain-path-small`} key={i}>
          {console.log(evolution)}
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
    });
  };

  const evolutionHTML = getEvolutions(
    Object.entries(pokeChainData.chain.evolves_to)
  );

  return <> {evolutionHTML}</>;
};

export default EvolutionChainVerticalSection;

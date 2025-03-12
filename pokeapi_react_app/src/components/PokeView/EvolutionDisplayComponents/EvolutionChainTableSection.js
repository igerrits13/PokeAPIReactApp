import React, { useEffect } from "react";
import { motion } from "motion/react";
import PokemonCard from "../../CommonComponents/PokemonCardComponents/PokemonCard";
import EvolutionChainDetails from "./EvolutionChainDetails";

const EvolutionChainTableSection = ({
  pokeSpeciesData,
  pokeChainData,
  getPokeNum,
  whosThatPokemon,
  setLevel,
  screenSize,
  isDarkMode,
}) => {
  useEffect(() => {
    Object.entries(pokeChainData)[1][1].evolves_to.forEach((base) => {
      if (
        base.species.name === pokeSpeciesData.name &&
        base.evolution_details.length > 0
      ) {
        setLevel(
          base.evolution_details[0].min_level === null
            ? 1
            : base.evolution_details[0].min_level
        );
      } else if (base.evolves_to.length !== 0) {
        Object.entries(base.evolves_to).forEach((evolution) => {
          if (
            evolution[1].species.name === pokeSpeciesData.name &&
            evolution[1].evolution_details.length > 0
          ) {
            setLevel(
              evolution[1].evolution_details[0].min_level === null
                ? base.evolution_details[0].min_level === null
                  ? 1
                  : base.evolution_details[0].min_level
                : evolution[1].evolution_details[0].min_level
            );
          }
        });
      }
    });
  }, [pokeSpeciesData, pokeChainData, setLevel]);

  // Recursively get evolutions of the current Pokémon if there are any
  const getEvolutions = (evolutions) => {
    return (
      <div
        className={`${
          screenSize === "x-large"
            ? "evolution-chain-path-fork-large"
            : "evolution-chain-path-fork-small"
        }`}
      >
        {evolutions.map((evolution, i) => {
          return (
            <div
              className={`${
                screenSize === "x-large"
                  ? "evolution-chain-path-large"
                  : "evolution-chain-path-small"
              }`}
              key={i}
            >
              <div
                className={`${
                  screenSize === "x-large"
                    ? "evolution-chain-path-section-large"
                    : "evolution-chain-path-section-small"
                }`}
              >
                <EvolutionChainDetails
                  evolution={evolution}
                  screenSize={screenSize}
                  isDarkMode={isDarkMode}
                />
                {screenSize === "x-large" && (
                  <motion.i
                    className="fa-solid fa-arrow-right-long evolution-chain-image"
                    whileHover={{ translateX: 10 }}
                    whileTap={{ translateX: 10 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div>
                  {screenSize !== "x-large" && (
                    <motion.i
                      className="fa-solid fa-arrow-down-long evolution-chain-image"
                      whileHover={{ translateY: 10 }}
                      whileTap={{ translateY: 10 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
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
                      whosThatPokemon={whosThatPokemon}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
              {evolution[1].evolves_to.length > 0 && (
                <div
                  className={`${
                    screenSize === "x-large"
                      ? "evolution-chain-path-section-large"
                      : "evolution-chain-path-section-small"
                  } ${
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

export default EvolutionChainTableSection;

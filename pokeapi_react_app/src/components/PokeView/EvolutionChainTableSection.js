import React from "react";
import { motion } from "motion/react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainDetails from "./EvolutionChainDetails";

const EvolutionChainTableSection = ({
  pokeChainData,
  getPokeNum,
  screenSize,
  isDarkMode,
}) => {
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
          console.log(evolution);
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

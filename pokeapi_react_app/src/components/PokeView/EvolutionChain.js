import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../CommonComponents/PokemonCard";

const EvolutionChain = ({ pokeChainURL, screenSize, isDarkMode }) => {
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  const [pokeChainData, setPokeChainData] = useState(null);
  const [isPokeChainLoading, setIsPokeChainLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data for the current Pokémon chain
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

  const getPokeNum = (pokeURL) => {
    // Seperate out the integer from the url
    const urlArr = pokeURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

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
            <i className="fa-solid fa-arrow-right-long" />
            <div className="evolution-chain-card">
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

  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        Evolution Chain
      </div>
      {!isPokeChainLoading && (
        <div className={`evolution-chain-container-horizontal ${fontStyle}`}>
          <div className="evolution-chain-section-horizontal flex-centered">
            <div className="evolution-chain-icon-row">
              <div className="evolution-chain-card">
                <PokemonCard
                  obj={pokeChainData.chain.species}
                  i={getPokeNum(pokeChainData.chain.species.url)}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
          <div
            className={`evolution-chain-section-vertical ${
              Object.entries(pokeChainData.chain.evolves_to).length === 1
                ? "flex-centered"
                : ""
            }
          }`}
          >
            {getEvolutions(Object.entries(pokeChainData.chain.evolves_to))}
          </div>
        </div>
      )}
    </>
  );
};

export default EvolutionChain;

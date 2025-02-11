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

  // Map to match for each possible evolution trigger case
  const getTrigger = (evolutionDetails) => {
    let evoArr = Array.from(Object.entries(evolutionDetails)).filter(
      (item) => item[0] !== "trigger"
    );

    switch (evolutionDetails.trigger.name) {
      case "level-up":
        return evolutionDetails.min_level
          ? [
              `Reach level ${evolutionDetails.min_level}`,
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png",
              evoArr.filter((item) => item[0] !== "min_level"),
            ]
          : ["Level up", [], evoArr];
      case "trade":
        return ["Trade for", [], evoArr];
      case "use-item":
        return ["Use", [], evoArr];
      case "shed":
        return ["Shed", [], evoArr];
      case "spin":
        return ["Spin", [], evoArr];
      case "tower-of-darkness":
        return ["Tower of Darkness", [], evoArr];
      case "tower-of-waters":
        return ["Towers of Waters", [], evoArr];
      case "three-critical-hits":
        return [
          "Land 3 critical hits with Pokémon in single battle",
          [],
          evoArr,
        ];
      case "take-damage":
        return ["Take damage", [], evoArr];
      case "other":
        return ["Other", [], evoArr];
      case "agile-style-move":
        return ["Agile moves", [], evoArr];
      case "strong-style-move":
        return ["Strong moves", [], evoArr];
      case "recoil-damage":
        return ["Recoil damage", [], evoArr];
      default:
        return [`Not found: ${evolutionDetails.trigger.name}`, [], evoArr];
    }
  };

  const genderMapping = {
    0: "Male",
    1: "Female",
    2: "Genderless",
  };

  const getEvoDetails = (evolutionDetails) => {
    let detailsArr = [];
    Object.entries(evolutionDetails).forEach((detail, i) => {
      if (detail[1][1] !== null && detail[1][1] !== undefined) {
        console.log("Keeping");
        console.log(detail);
      } else {
        console.log("Skipping");
        console.log(detail);
      }
    });
    return [detailsArr];

    // held_item: [DarkType, "dark-type"],
    // item: [DragonType, "dragon-type"],
    // known_move: [ElectricType, "electric-type"],
    // known_move_type: [FairyType, "fairy-type"],
    // location: [FightingType, "fighting-type"],
    // min_affection: [FireType, "fire-type"],
    // min_beauty: [FlyingType, "flying-type"],
    // min_happiness: [GhostType, "ghost-type"],
    // min_level: [GrassType, "grass-type"],
    // needs_overworld_rain: [GroundType, "ground-type"],
    // party_species: [IceType, "ice-type"],
    // party_type: [NormalType, "normal-type"],
    // relative_physical_stats: [PoisonType, "poison-type"],
    // time_of_day: [PsychicType, "psychic-type"],
    // trade_species: [RockType, "rock-type"],
    // turn_upside_down: [SteelType, "steel-type"],
  };

  const getTriggerEvent = (evolution) => {
    // Get the trigger string, array of details to still look through and icon URL of the current evolution chain link
    const [evoTrigger, iconURL, evoArr] = getTrigger(
      Object.entries(evolution.evolution_details)[0][1]
    );

    const [evoTriggerArr, iconURLArr] = getEvoDetails(evoArr);

    evoTriggerArr.unshift(evoTrigger);

    return (
      <div className="evolution-chain-section-vertical evolution-chain-section-details">
        {evoTriggerArr}
        {iconURL[0] !== undefined && (
          <img
            className="evolution-chain-image"
            src={iconURL}
            alt="Rare Candy"
          />
        )}
      </div>
    );
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
            {Object.entries(evolution[1].evolution_details)[0] &&
              getTriggerEvent(evolution[1])}
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

import { useState, useEffect } from "react";
import React from "react"; // Works for React 17+
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import PokemonCard from "../CommonComponents/PokemonCard";
import pokeBall from "../icons/poke-ball.png";

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
  // Setup the line styling between information sections based on if the user is using light or dark mode
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";

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

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getDetailTitle = (detail) => {
    let detailTitle = detail.split("-");
    detailTitle = detailTitle.map((detailName, i) => {
      return detailName[0].toUpperCase() + detailName.slice(1);
    });
    return detailTitle.join(" ");
  };

  const shedMapping = {
    shedinja: [
      <>
        Reach level 20 with an empty slot in your party and a Poké ball in your
        bag
      </>,
      <img
        className="evolution-chain-image-ball"
        src={pokeBall}
        alt={`Poké Ball`}
      />,
    ],
  };

  const spinMapping = {
    alcremie: [
      <>Give the Pokémon a sweet treat, spin around, and strike a pose</>,
      <i className="fa-solid fa-ice-cream evolution-chain-image" />,
    ],
  };

  const towerOfDarknessMapping = {
    urshifu: [
      <>Single Strike Style - Clear the Tower of Darkness with this Pokémon</>,
      <i className="fa-solid fa-gopuram evolution-chain-image" />,
    ],
  };

  const towerOfWaterMapping = {
    urshifu: [
      <>Rapid Strike Style - Clear the Tower of Water with this Pokémon</>,
      <i className="fa-solid fa-gopuram evolution-chain-image" />,
    ],
  };

  const threeCriticalMapping = {
    sirfetchd: [
      <>
        Land three critical hits with this Pokémon in single battle (Galarian
        variant only)
      </>,
      <i className="fa-solid fa-person-falling-burst evolution-chain-image" />,
    ],
  };

  const takeDamageMapping = {
    runerigus: [
      <>
        Pokémon must take at least 49 damage, then take the Pokémon under the
        largest stone arch in the Dusty Bowl in the Wild Area (Galarian variant
        only)
      </>,
      <i className="fa-solid fa-archway evolution-chain-image" />,
    ],
  };

  const otherMapping = {
    pawmot: [
      <>
        Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
        up
      </>,
      <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
    ],
    maushold: [
      <>Catch a Tandemaus Pokémon, then level the Pokémon up</>,
      <img
        className="evolution-chain-image-ball"
        src={pokeBall}
        alt={`Poké Ball`}
      />,
    ],
    brambleghast: [
      <>
        Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
        up
      </>,
      <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
    ],
    rabsca: [
      <>
        Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
        up
      </>,
      <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
    ],
    palafin: [
      <>
        While in a multiplayer session, either online or locally with another
        player, level up the Pokémon
      </>,
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
        alt={"Rare Candy"}
      />,
    ],
    annihilape: [
      <>
        Level up the Pokémon after using the move 'Rage Fist' 20 times in battle
      </>,
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
        alt={"Rare Candy"}
      />,
    ],
    kingambit: [
      <>
        Catch a 'leader' Bisharp that is holding a Leader's Crest, then defeat
        three other 'leader' Bisharp that hold Leader's Crests, then level up
        the Pokémon
      </>,
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
        alt={"Rare Candy"}
      />,
    ],
    gholdengo: [
      <>Collect 999 Gimmighoul Coins and then level up your Pokémon</>,
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
        alt={"Rare Candy"}
      />,
    ],
  };

  const recoilDamageMapping = {
    basculegion: [
      <>Pokémon must take at least 294 recoil damage, then level up</>,
      <img
        className="evolution-chain-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
        alt={"Rare Candy"}
      />,
    ],
  };

  // Map to match for each possible evolution trigger case
  const getTrigger = (evolutionDetails, speciesName) => {
    let evoArr = Array.from(Object.entries(evolutionDetails)).filter(
      (item) => item[0] !== "trigger"
    );

    switch (evolutionDetails.trigger.name) {
      case "level-up":
        return evolutionDetails.min_level
          ? [
              <>Reach level {evolutionDetails.min_level}</>,
              <img
                className="evolution-chain-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
                alt={"Rare Candy"}
              />,
              evoArr.filter((item) => item[0] !== "min_level"),
            ]
          : [
              <>Level up</>,
              <img
                className="evolution-chain-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
                alt={"Rare Candy"}
              />,
              evoArr.filter((item) => item[0] !== "min_level"),
            ];
      case "trade":
        return [
          evolutionDetails.trade_species ? (
            <>
              Trade for{" "}
              <Link
                className={`clean-text`}
                // ${fontStyle}
                to={`/pokemon/${evolutionDetails.trade_species.name}`}
              >
                <motion.div
                  className="dyn-section-link"
                  whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
                  whileTap={{ scale: 0.9, rotate: "5deg" }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-block" }}
                >
                  {evolutionDetails.trade_species.name}
                </motion.div>
              </Link>
            </>
          ) : (
            <>Trade for any Pokémon</>
          ),
          <i className="fa-solid fa-rotate evolution-chain-image" />,
          evoArr.filter((item) => item[0] !== "trade_species"),
        ];
      case "use-item":
        return [<>Use</>, [], evoArr];
      case "shed":
        return [
          shedMapping[speciesName] ? (
            <>{shedMapping[speciesName][0].props.children}</>
          ) : (
            <>Shed</>
          ),
          shedMapping[speciesName] ? shedMapping[speciesName][1] : "",
          evoArr,
        ];
      case "spin":
        return [
          spinMapping[speciesName] ? (
            <>{spinMapping[speciesName][0].props.children}</>
          ) : (
            <>Spin</>
          ),
          spinMapping[speciesName] ? spinMapping[speciesName][1] : "",
          evoArr,
        ];
      case "tower-of-darkness":
        return [
          towerOfDarknessMapping[speciesName] ? (
            <>{towerOfDarknessMapping[speciesName][0].props.children}</>
          ) : (
            <>Tower of Darkness</>
          ),
          towerOfDarknessMapping[speciesName]
            ? towerOfDarknessMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "tower-of-waters":
        return [
          towerOfWaterMapping[speciesName] ? (
            <>{towerOfWaterMapping[speciesName][0].props.children}</>
          ) : (
            <>Tower of Water</>
          ),
          towerOfWaterMapping[speciesName]
            ? towerOfWaterMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "three-critical-hits":
        return [
          threeCriticalMapping[speciesName] ? (
            <>{threeCriticalMapping[speciesName][0].props.children}</>
          ) : (
            <>Three critical hits</>
          ),
          threeCriticalMapping[speciesName]
            ? threeCriticalMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "take-damage":
        return [
          takeDamageMapping[speciesName] ? (
            <>{takeDamageMapping[speciesName][0].props.children}</>
          ) : (
            <>Take damage</>
          ),
          takeDamageMapping[speciesName]
            ? takeDamageMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "other":
        return [
          otherMapping[speciesName] ? (
            <>{otherMapping[speciesName][0].props.children}</>
          ) : (
            <>Other</>
          ),
          otherMapping[speciesName] ? otherMapping[speciesName][1] : "",
          evoArr,
        ];
      case "agile-style-move":
        return [
          speciesName === "wyrdeer" ? <></> : <>Agile moves</>,
          [],
          evoArr,
        ];
      case "strong-style-move":
        return [
          speciesName === "overqwil" ? <></> : <>Strong moves</>,
          [],
          evoArr,
        ];
      case "recoil-damage":
        return [
          recoilDamageMapping[speciesName] ? (
            <>{recoilDamageMapping[speciesName][0].props.children}</>
          ) : (
            <>Recoil damage</>
          ),
          recoilDamageMapping[speciesName]
            ? recoilDamageMapping[speciesName][1]
            : "",
          evoArr,
        ];
      default:
        return [<>Not found: {evolutionDetails.trigger.name}</>, [], evoArr];
    }
  };

  const genderMapping = {
    1: ["Female", <i className="fa-solid fa-venus evolution-chain-image" />],
    2: ["Male", <i className="fa-solid fa-mars evolution-chain-image" />],
    3: ["Genderless", []],
  };

  const relativeStatsMapping = {
    0: [
      "attack is less than defense",
      <i className="fa-solid fa-shield evolution-chain-image" />,
    ],
    1: ["attack is equal to defense", []],
    2: ["attack is greater than defense", []],
  };

  const getCurrDetail = (detail, triggerName) => {
    switch (detail[0]) {
      case "gender":
        return [
          <>({genderMapping[detail[1]][0]} Only)</>,
          genderMapping[detail[1]][1],
        ];
      case "held_item":
        return [
          <>while holding {getDetailTitle(detail[1].name)}</>,
          <img
            className="evolution-chain-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
            alt={getDetailTitle(detail[1].name)}
          />,
        ];
      case "item":
        return [
          <>{getDetailTitle(detail[1].name)}</>,
          <img
            className="evolution-chain-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
            alt={getDetailTitle(detail[1].name)}
          />,
        ];
      case "known_move":
        return [
          <>
            {triggerName !== "agile-style-move" &&
            triggerName !== "strong-style-move"
              ? "while "
              : ""}
            Pokémon knows the move {getDetailTitle(detail[1].name)}
          </>,
          "",
        ];
      case "known_move_type":
        return [
          <>
            {triggerName !== "agile-style-move" &&
            triggerName !== "strong-style-move"
              ? "while "
              : ""}
            Pokémon knows a {getDetailTitle(detail[1].name)} type move
          </>,
          "",
        ];
      case "location":
        return [
          <>while at {getDetailTitle(detail[1].name)}</>,
          <i className="fa-solid fa-signs-post evolution-chain-image" />,
        ];
      case "min_affection":
        return [
          <>with a minimum affection of {detail[1]}</>,
          <i className="fa-solid fa-hand-holding-heart evolution-chain-image" />,
        ];
      case "min_beauty":
        return [
          <>with a minimum beauty of {detail[1]}</>,
          <i className="fa-solid fa-spray-can-sparkles evolution-chain-image" />,
        ];
      case "min_happiness":
        return [
          <>with a minimum happiness of {detail[1]}</>,
          <i className="fa-solid fa-face-laugh-beam evolution-chain-image" />,
        ];
      case "min_level":
        return [<>with a minimum level of {detail[1]}</>, ""];
      case "needs_overworld_rain":
        if (detail[1] === true)
          return [
            <>while it is raining</>,
            <i className="fa-solid fa-cloud-rain evolution-chain-image" />,
          ];
        else {
          return [<></>, ""];
        }
      case "party_species":
        return [
          <>
            with a{" "}
            <Link
              className={`clean-text`}
              // ${fontStyle}
              to={`/pokemon/${detail[1].name}`}
            >
              <motion.div
                className="dyn-section-link"
                whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
                whileTap={{ scale: 0.9, rotate: "5deg" }}
                transition={{ duration: 0.1 }}
                style={{ display: "inline-block" }}
              >
                {getPokeName(detail[1].name)}
              </motion.div>
            </Link>{" "}
            species Pokémon in their party
          </>,
          "",
        ];
      case "party_type":
        return [
          <>
            with a{" "}
            <Link
              className={`clean-text`}
              // ${fontStyle}
              to={`/types/${detail[1].name}`}
            >
              <motion.div
                className="dyn-section-link"
                whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
                whileTap={{ scale: 0.9, rotate: "5deg" }}
                transition={{ duration: 0.1 }}
                style={{ display: "inline-block" }}
              >
                {getPokeName(detail[1].name)}
              </motion.div>
            </Link>{" "}
            type Pokémon in their party
          </>,
          "",
        ];
      case "relative_physical_stats":
        return [
          <>{relativeStatsMapping[detail[1]][0]}</>,
          relativeStatsMapping[detail[1]][1],
        ];
      case "time_of_day":
        if (detail[1] === "day")
          return [
            <>during the day</>,
            <i className="fa-solid fa-sun evolution-chain-image" />,
          ];
        else if (detail[1] === "night")
          return [
            <>at night</>,
            <i className="fa-solid fa-moon evolution-chain-image" />,
          ];
        else if (detail[1] === "") return [<></>, []];
        else {
          return [<>Not found: {detail[1]}</>, ""];
        }
      case "turn_upside_down":
        if (detail[1] === true)
          return [
            <> while holding the 3DS upside down</>,
            <i className="fa-solid fa-gamepad evolution-chain-image-upside-down" />,
          ];
        else {
          return [<></>, ""];
        }
      default:
        return ["", ""];
    }
  };

  const getEvoDetails = (evolutionDetails, triggerName) => {
    let detailsArr = [],
      iconsArr = [];
    Object.entries(evolutionDetails).forEach((detail, i) => {
      if (detail[1][1] !== null) {
        const [currDetail, currIcon] = getCurrDetail(detail[1], triggerName);
        detailsArr.push(currDetail);
        iconsArr.push(currIcon);
      } else {
        // Why is there an else?
      }
    });
    return [detailsArr, iconsArr];
  };

  function moveItemToEnd(evoTriggerArr, iconHTMLArr) {
    const i = evoTriggerArr.findIndex((trigger) => {
      const children = trigger.props.children;

      // If children is an array, check each element for '('
      if (Array.isArray(children)) {
        return children.some(
          (child) => typeof child === "string" && child.includes("(")
        );
      }

      // If children is a string, check if it contains '('
      if (typeof children === "string") {
        return children.includes("(");
      }

      return false;
    });
    const j = iconHTMLArr.findIndex(
      (icon) =>
        icon.props.className.includes("fa-venus") ||
        icon.props.className.includes("fa-mars")
    );

    // Get the item from array2 at the same index
    if (i !== -1 && j !== -1) {
      const triggerItem = evoTriggerArr[i];
      const iconItem = iconHTMLArr[j];

      // Remove the item from its current position in iconHTMLArr
      evoTriggerArr.splice(i, 1);
      iconHTMLArr.splice(j, 1);

      // Push the item to the end of iconHTMLArr
      evoTriggerArr.push(triggerItem);
      iconHTMLArr.push(iconItem);
    }
    return [evoTriggerArr, iconHTMLArr];
  }

  const getTriggerEvent = (evolution) => {
    const evoHTML = evolution.evolution_details.map((currDetail, i) => {
      // Get the trigger string, array of details to still look through and icon URL of the current evolution chain link
      const [evoTrigger, iconHTML, evoArr] = getTrigger(
        Object.entries(evolution.evolution_details)[i][1],
        evolution.species.name
      );
      let [evoTriggerArr, iconHTMLArr] = getEvoDetails(
        evoArr,
        evolution.evolution_details[0].trigger.name
      );

      evoTriggerArr.unshift(evoTrigger);
      iconHTMLArr.unshift(iconHTML);
      evoTriggerArr = evoTriggerArr.filter(
        (trigger) =>
          trigger !== "" && !(Array.isArray(trigger) && trigger.length === 0)
      );
      iconHTMLArr = iconHTMLArr.filter(
        (trigger) =>
          trigger !== "" && !(Array.isArray(trigger) && trigger.length === 0)
      );
      [evoTriggerArr, iconHTMLArr] = moveItemToEnd(evoTriggerArr, iconHTMLArr);

      return (
        <div className="evoluion-chain-trigger-desc" key={i}>
          {/* {evoTriggerArr.join(" ")} */}
          {evoTriggerArr.map((trigger, j) => {
            return <React.Fragment key={j}>{trigger} </React.Fragment>;
          })}
          <div
            className={`evolution-chain-image-container ${
              i !== evolution.evolution_details.length - 1 ? lineStyle : ""
            }`}
          >
            {iconHTMLArr.map((iconHTML, j) => {
              return <div key={j}>{iconHTML}</div>; // Will this cause issues showing items in a row together?
            })}
          </div>
        </div>
      );
    });
    return evoHTML;
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
            <div
              className={`evolution-chain-section-vertical ${
                screenSize === "x-large"
                  ? "evolution-chain-section-details-large"
                  : "evolution-chain-section-details-small"
              }`}
            >
              {getTriggerEvent(evolution[1])}
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

  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        Evolution Chain
      </div>
      {!isPokeChainLoading && (
        <div className={`evolution-chain-container-horizontal ${fontStyle}`}>
          <div className="evolution-chain-section-horizontal flex-centered">
            <div className="evolution-chain-icon-row">
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

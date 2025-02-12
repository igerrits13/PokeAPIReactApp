import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getDetailTitle = (detail) => {
    let detailTitle = detail.split("-");
    detailTitle = detailTitle.map((detailName, i) => {
      return detailName[0].toUpperCase() + detailName.slice(1);
    });
    return detailTitle.join(" ");
  };

  // function getItemName(url) {
  //   // Use regular expression to match the item name part in the URL
  //   const match = url.match(/items\/([^/]+)\.png/);

  //   // If a match is found, return the item name, else return null
  //   return match ? match[1] : null;
  // }

  const shedMapping = {
    shedinja: [
      "Reach level 20 with an empty slot in your party and a Poké ball in your bag",
      <img
        className="evolution-chain-image-ball"
        src={pokeBall}
        alt={`Poké Ball`}
      />,
    ],
  };

  const spinMapping = {
    alcremie: [
      "Give the Pokémon a sweet treat, spin around, and strike a pose",
      <i className="fa-solid fa-ice-cream evolution-chain-image" />,
    ],
  };

  const towerOfDarknessMapping = {
    urshifu: [
      "Single Strike Style - Clear the Tower of Darkness with this Pokémon",
      <i className="fa-solid fa-gopuram evolution-chain-image" />,
    ],
  };

  const towerOfWaterMapping = {
    urshifu: [
      "Rapid Strike Style - Clear the Tower of Water with this Pokémon",
      <i className="fa-solid fa-gopuram evolution-chain-image" />,
    ],
  };

  const threeCriticalMapping = {
    sirfetchd: [
      "Land three critical hits with this Pokémon in single battle (Galarian variant only)",
      <i className="fa-solid fa-person-falling-burst evolution-chain-image" />,
    ],
  };

  const takeDamageMapping = {
    runerigus: [
      "Pokémon must take at least 49 damage, then take it under the largest stone arch in the Dusty Bowl in the Wild Area",
      <i className="fa-solid fa-archway evolution-chain-image" />,
    ],
  };

  const recoilDamageMapping = {
    basculegion: [
      "Pokémon must take at least 249 recoil damage, then level up",
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

    // console.log(evolutionDetails);
    switch (evolutionDetails.trigger.name) {
      case "level-up":
        return evolutionDetails.min_level
          ? [
              `Reach level ${evolutionDetails.min_level}`,
              // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png",
              <img
                className="evolution-chain-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
                alt={"Rare Candy"}
                // key={i}
              />,
              evoArr.filter((item) => item[0] !== "min_level"),
            ]
          : [
              "Level up",
              // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png",
              // <img
              //   className="evolution-chain-image"
              //   src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
              //   alt={"Rare Candy"}
              //   // key={i}
              // />,
              "",
              evoArr.filter((item) => item[0] !== "min_level"),
            ];
      case "trade":
        return (
          // evolutionDetails.trade_species
          //   ?
          [
            evolutionDetails.trade_species
              ? `Trade for ${evolutionDetails.trade_species.name}`
              : "Trade for any Pokémon",
            <i className="fa-solid fa-rotate evolution-chain-image" />,
            evoArr.filter((item) => item[0] !== "trade_species"),
          ]
        );
      // : [
      //     "Trade for any Pokémon",
      //     <i className="fa-solid fa-rotate" />,
      //     evoArr.filter((item) => item[0] !== "trade_species"),
      //   ];
      case "use-item":
        return ["Use", [], evoArr];
      case "shed":
        return [
          shedMapping[speciesName] ? shedMapping[speciesName][0] : "Shed",
          shedMapping[speciesName] ? shedMapping[speciesName][1] : "",
          evoArr,
        ];
      case "spin":
        return [
          spinMapping[speciesName] ? spinMapping[speciesName][0] : "Spin",
          spinMapping[speciesName] ? spinMapping[speciesName][1] : "",
          evoArr,
        ];
      case "tower-of-darkness":
        return [
          towerOfDarknessMapping[speciesName]
            ? towerOfDarknessMapping[speciesName][0]
            : "Tower of Darkness",
          towerOfDarknessMapping[speciesName]
            ? towerOfDarknessMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "tower-of-waters":
        return [
          towerOfWaterMapping[speciesName]
            ? towerOfWaterMapping[speciesName][0]
            : "Tower of Water",
          towerOfWaterMapping[speciesName]
            ? towerOfWaterMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "three-critical-hits":
        return [
          threeCriticalMapping[speciesName]
            ? threeCriticalMapping[speciesName][0]
            : "Three critical hits",
          threeCriticalMapping[speciesName]
            ? threeCriticalMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "take-damage":
        return [
          takeDamageMapping[speciesName]
            ? takeDamageMapping[speciesName][0]
            : "Take damage",
          takeDamageMapping[speciesName]
            ? takeDamageMapping[speciesName][1]
            : "",
          evoArr,
        ];
      case "other":
        return ["Other", [], evoArr];
      case "agile-style-move":
        return [speciesName === "wyrdeer" ? "" : "Agile moves", [], evoArr];
      case "strong-style-move":
        return [speciesName === "overqwil" ? "" : "Strong moves", [], evoArr];
      case "recoil-damage":
        return [
          recoilDamageMapping[speciesName]
            ? recoilDamageMapping[speciesName][0]
            : "Recoil damage",
          recoilDamageMapping[speciesName]
            ? recoilDamageMapping[speciesName][1]
            : "",
          evoArr,
        ];
      default:
        return [`Not found: ${evolutionDetails.trigger.name}`, [], evoArr];
    }
  };

  const genderMapping = {
    1: ["Female", <i className="fa-solid fa-venus evolution-chain-image" />],
    2: ["Male", <i className="fa-solid fa-mars evolution-chain-image" />],
    3: ["Genderless", []],
  };

  const getCurrDetail = (detail, triggerName) => {
    switch (detail[0]) {
      case "gender":
        // console.log(detail[1]);
        return [
          `(${genderMapping[detail[1]][0]} Only)`,
          genderMapping[detail[1]][1],
        ];
      case "held_item":
        return [
          `while holding ${getDetailTitle(detail[1].name)}`,
          // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`,
          <img
            className="evolution-chain-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
            alt={getDetailTitle(detail[1].name)}
            // key={i}
          />,
        ];
      case "item":
        return [
          `${getDetailTitle(detail[1].name)}`,
          // `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`,
          <img
            className="evolution-chain-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
            alt={getDetailTitle(detail[1].name)}
            // key={i}
          />,
        ];
      case "known_move":
        return [
          `${
            triggerName !== "agile-style-move" &&
            triggerName !== "strong-style-move"
              ? "while p"
              : "P"
          }okémon knows the move ${getDetailTitle(detail[1].name)}`,
          "",
        ];
      case "known_move_type":
        return [
          `${
            triggerName !== "agile-style-move" &&
            triggerName !== "strong-style-move"
              ? "while p"
              : "P"
          }okémon knows a ${getDetailTitle(detail[1].name)} type move`,
          "",
        ];
      case "location":
        return [
          `while at ${getDetailTitle(detail[1].name)}`,
          // <i class="fa-solid fa-location-dot"/>,
          <i className="fa-solid fa-signs-post evolution-chain-image" />,
        ];
      case "min_affection":
        return [
          `with a minimum affection of ${detail[1]}`,
          <i className="fa-solid fa-hand-holding-heart evolution-chain-image" />,
        ];
      case "min_beauty":
        return [
          `with a minimum beauty of ${detail[1]}`,
          <i className="fa-solid fa-spray-can-sparkles evolution-chain-image" />,
        ];
      case "min_happiness":
        return [
          `with a minimum happiness of ${detail[1]}`,
          <i className="fa-solid fa-face-laugh-beam evolution-chain-image" />,
        ];
      case "min_level":
        return [`with a minimum level of ${detail[1]}`, ""];
      case "needs_overworld_rain":
        if (detail[1] === true)
          return [
            `while it is raining`,
            <i className="fa-solid fa-cloud-rain evolution-chain-image" />,
          ];
        else {
          return ["", ""];
        }
      default:
        return ["", ""];
    }
  };

  const getEvoDetails = (evolutionDetails, triggerName) => {
    let detailsArr = [],
      iconsArr = [];
    Object.entries(evolutionDetails).forEach((detail, i) => {
      // console.log(detail);
      if (
        detail[1][1] !== null
        //  && detail[1][1] !== undefined
      ) {
        const [currDetail, currIcon] = getCurrDetail(detail[1], triggerName);
        detailsArr.push(currDetail);
        iconsArr.push(currIcon);
      } else {
        // Why is there an else?
      }
    });
    return [detailsArr, iconsArr];
  };

  function moveItemToEnd(evoTriggerArr) {
    return evoTriggerArr
      .filter((trigger) => !trigger.startsWith("(")) // Get items that don't start with '('
      .concat(evoTriggerArr.filter((trigger) => trigger.startsWith("("))); // Get items that do start with '(' and add them to the end
  }

  // const getTriggerEvent = (evolution) => {
  //   // console.log(evolution.evolution_details);
  //   // evolution.map((currDetail) => {
  //   //   console.log(currDetail);
  //   //   return "";
  //   // });
  //   // Get the trigger string, array of details to still look through and icon URL of the current evolution chain link
  //   const [evoTrigger, iconHTML, evoArr] = getTrigger(
  //     Object.entries(evolution.evolution_details)[0][1]
  //   );

  //   let [evoTriggerArr, iconHTMLArr] = getEvoDetails(evoArr);

  //   evoTriggerArr.unshift(evoTrigger);
  //   iconHTMLArr.unshift(iconHTML);
  //   evoTriggerArr = evoTriggerArr.filter(
  //     (trigger) =>
  //       trigger !== "" && !(Array.isArray(trigger) && trigger.length === 0)
  //   );
  //   evoTriggerArr = moveItemToEnd(evoTriggerArr);
  //   iconHTMLArr = iconHTMLArr.filter(
  //     (trigger) =>
  //       trigger !== "" && !(Array.isArray(trigger) && trigger.length === 0)
  //   );

  //   return (
  //     <div
  //       className={`evolution-chain-section-vertical ${
  //         screenSize === "x-large"
  //           ? "evolution-chain-section-details-large"
  //           : "evolution-chain-section-details-small"
  //       }`}
  //     >
  //       {(evoTriggerArr = evoTriggerArr.join(" "))}
  //       <div>{evoTriggerArr}</div>

  //       <div className="evolution-chain-image-container">
  //         {iconHTMLArr.map((iconHTML, i) => {
  //           console.log(evoTriggerArr[0]);
  //           return (
  //             <div key={i} className="evolution-chain-image">
  //               {iconHTML}
  //             </div>
  //           ); // Will this cause issues showing items in a row together?
  //           // iconHTML !== "" && (
  //           // <img
  //           //   className="evolution-chain-image"
  //           //   src={iconHTML}
  //           //   alt={getDetailTitle(getItemName(iconHTML))}
  //           //   key={i}
  //           // />
  //           // )
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const getTriggerEvent = (evolution) => {
    // console.log(evolution.species.name);
    const evoHTML = evolution.evolution_details.map((currDetail, i) => {
      // console.log(currDetail);
      //   return "";
      // });
      // Get the trigger string, array of details to still look through and icon URL of the current evolution chain link
      const [evoTrigger, iconHTML, evoArr] = getTrigger(
        Object.entries(evolution.evolution_details)[i][1],
        evolution.species.name
      );
      // console.log(evoTrigger);
      // console.log(evoArr);
      // console.log(evolution.evolution_details[0].trigger.name);
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
      evoTriggerArr = moveItemToEnd(evoTriggerArr);
      iconHTMLArr = iconHTMLArr.filter(
        (trigger) =>
          trigger !== "" && !(Array.isArray(trigger) && trigger.length === 0)
      );

      return (
        // <div
        //   className={`evolution-chain-section-vertical ${
        //     screenSize === "x-large"
        //       ? "evolution-chain-section-details-large"
        //       : "evolution-chain-section-details-small"
        //   }`}
        // >
        <div
          className="evoluion-chain-trigger-desc"
          key={i}
          // obj.id !== sectionInfo.length - 1 ? lineStyle : ""div
          // className={`${obj.id !== sectionInfo.length - 1 ? lineStyle : ""}`}
        >
          {evoTriggerArr.join(" ")}
          <div
            className={`evolution-chain-image-container ${
              i !== evolution.evolution_details.length - 1 ? lineStyle : ""
            }`}
          >
            {iconHTMLArr.map((iconHTML, i) => {
              // console.log(iconHTML.props.src);
              // console.log(iconHTML);
              return (
                <div
                  key={i}
                  // className="evolution-chain-image"
                >
                  {iconHTML}
                </div>
              ); // Will this cause issues showing items in a row together?
              // iconHTML !== "" && (
              // <img
              //   className="evolution-chain-image"
              //   src={iconHTML}
              //   alt={getDetailTitle(getItemName(iconHTML))}
              //   key={i}
              // />
              // )
            })}
          </div>
        </div>
        // </div>
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
            {/* {console.log(evolution)} */}
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

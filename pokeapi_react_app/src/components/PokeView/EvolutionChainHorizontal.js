import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
import PokemonCard from "../CommonComponents/PokemonCard";
import EvolutionChainHorizontalSection from "./EvolutionChainHorizontalSection";
// import pokeBall from "../icons/poke-ball.png";

const EvolutionChainHorizontal = ({
  pokeChainData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font style, and line style between information sections based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  // const lineStyle = isDarkMode
  //   ? "component-outline-bottom-dark"
  //   : "component-outline-bottom-light";

  // // Capitalize the first word of each part of the pokémon's name
  // const getPokeName = (name) => {
  //   const formattedName = name.split("-").map((obj, i) => {
  //     return obj[0].toUpperCase() + obj.slice(1);
  //   });

  //   return formattedName.join(" ");
  // };

  // Get the current Pokémons number from their url
  const getPokeNum = (pokeURL) => {
    // Seperate out the integer from the url
    const urlArr = pokeURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

  // // Seperate the generation title by '-' and capitalize appropriate letters
  // const getDetailTitle = (detail) => {
  //   let detailTitle = detail.split("-");
  //   detailTitle = detailTitle.map((detailName, i) => {
  //     return detailName[0].toUpperCase() + detailName.slice(1);
  //   });
  //   return detailTitle.join(" ");
  // };

  // // Mapping for Pokémon who evolve through shedding
  // const shedMapping = {
  //   shedinja: [
  //     <>
  //       Reach level 20 with an empty slot in your party and a Poké ball in your
  //       bag
  //     </>,
  //     <img
  //       className="evolution-chain-image-ball"
  //       src={pokeBall}
  //       alt={`Poké Ball`}
  //     />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve through spinning
  // const spinMapping = {
  //   alcremie: [
  //     <>Give the Pokémon a sweet treat, spin around, and strike a pose</>,
  //     <i className="fa-solid fa-ice-cream evolution-chain-image" />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve through training in the tower of darkness
  // const towerOfDarknessMapping = {
  //   urshifu: [
  //     <>Single Strike Style - Clear the Tower of Darkness with this Pokémon</>,
  //     <i className="fa-solid fa-gopuram evolution-chain-image" />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve through training in the tower of water
  // const towerOfWaterMapping = {
  //   urshifu: [
  //     <>Rapid Strike Style - Clear the Tower of Water with this Pokémon</>,
  //     <i className="fa-solid fa-gopuram evolution-chain-image" />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve by landing critical hits
  // const threeCriticalMapping = {
  //   sirfetchd: [
  //     <>
  //       Land three critical hits with this Pokémon in single battle (Galarian
  //       variant only)
  //     </>,
  //     <i className="fa-solid fa-person-falling-burst evolution-chain-image" />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve by taking damage
  // const takeDamageMapping = {
  //   runerigus: [
  //     <>
  //       Pokémon must take at least 49 damage, then take the Pokémon under the
  //       largest stone arch in the Dusty Bowl in the Wild Area (Galarian variant
  //       only)
  //     </>,
  //     <i className="fa-solid fa-archway evolution-chain-image" />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve in other ways not listed
  // const otherMapping = {
  //   pawmot: [
  //     <>
  //       Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
  //       up
  //     </>,
  //     <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
  //   ],
  //   maushold: [
  //     <>Catch a Tandemaus Pokémon, then level the Pokémon up</>,
  //     <img
  //       className="evolution-chain-image-ball"
  //       src={pokeBall}
  //       alt={`Poké Ball`}
  //     />,
  //   ],
  //   brambleghast: [
  //     <>
  //       Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
  //       up
  //     </>,
  //     <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
  //   ],
  //   rabsca: [
  //     <>
  //       Walk with the Pokémon in 'Let's Go' mode for 1,000 steps, then level it
  //       up
  //     </>,
  //     <i className="fa-solid fa-shoe-prints evolution-chain-image" />,
  //   ],
  //   palafin: [
  //     <>
  //       While in a multiplayer session, either online or locally with another
  //       player, level up the Pokémon
  //     </>,
  //     <img
  //       className="evolution-chain-image"
  //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //       alt={"Rare Candy"}
  //     />,
  //   ],
  //   annihilape: [
  //     <>
  //       Level up the Pokémon after using the move 'Rage Fist' 20 times in battle
  //     </>,
  //     <img
  //       className="evolution-chain-image"
  //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //       alt={"Rare Candy"}
  //     />,
  //   ],
  //   kingambit: [
  //     <>
  //       Catch a 'leader' Bisharp that is holding a Leader's Crest, then defeat
  //       three other 'leader' Bisharp that hold Leader's Crests, then level up
  //       the Pokémon
  //     </>,
  //     <img
  //       className="evolution-chain-image"
  //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //       alt={"Rare Candy"}
  //     />,
  //   ],
  //   gholdengo: [
  //     <>Collect 999 Gimmighoul Coins and then level up your Pokémon</>,
  //     <img
  //       className="evolution-chain-image"
  //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //       alt={"Rare Candy"}
  //     />,
  //   ],
  // };

  // // Mapping for Pokémon who evolve by taking recoil damage
  // const recoilDamageMapping = {
  //   basculegion: [
  //     <>Pokémon must take at least 294 recoil damage, then level up</>,
  //     <img
  //       className="evolution-chain-image"
  //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //       alt={"Rare Candy"}
  //     />,
  //   ],
  // };

  // // Move part of the text description and its corresponding icon to the end of the array,
  // // to be rendered last
  // function moveItemToEnd(evoTriggerArr, iconHTMLArr) {
  //   // Get the index of an evolution detail that should be moved
  //   const i = evoTriggerArr.findIndex((trigger) => {
  //     const details = trigger.props.children;

  //     // If detail is an array, check each element for '('
  //     if (Array.isArray(details)) {
  //       return details.some(
  //         (detail) => typeof detail === "string" && detail.includes("(")
  //       );
  //     }

  //     // If detail is a string, check if it contains '('
  //     if (typeof details === "string") {
  //       return details.includes("(");
  //     }

  //     return false;
  //   });

  //   let j = -1;
  //   // Get the index of an icon that should be moved only if a detail was found
  //   if (i !== -1) {
  //     j = iconHTMLArr.findIndex(
  //       (icon) =>
  //         icon.props.className.includes("fa-venus") ||
  //         icon.props.className.includes("fa-mars")
  //     );
  //   }

  //   // If there are items to be moved, move them both to the end
  //   if (i !== -1 && j !== -1) {
  //     // Store a copy of both items
  //     const triggerItem = evoTriggerArr[i];
  //     const iconItem = iconHTMLArr[j];

  //     // Remove the items from the existing array
  //     evoTriggerArr.splice(i, 1);
  //     iconHTMLArr.splice(j, 1);

  //     // Add the stored items to the end of the array
  //     evoTriggerArr.push(triggerItem);
  //     iconHTMLArr.push(iconItem);
  //   }
  //   return [evoTriggerArr, iconHTMLArr];
  // }

  // // Match each possible evolution trigger case and return the appropriate array
  // const getTrigger = (evolutionDetails, speciesName) => {
  //   // Remove the "trigger" entry from evolution details as it does not need to be looked at again
  //   let evoArr = Array.from(Object.entries(evolutionDetails)).filter(
  //     (item) => item[0] !== "trigger"
  //   );

  //   // Find the current trigger name and return an array containing JSX for the descriptive text,
  //   // icons that are applicable, and the rest of the evolution details, removing any as needed
  //   switch (evolutionDetails.trigger.name) {
  //     case "level-up":
  //       return evolutionDetails.min_level
  //         ? [
  //             <>Reach level {evolutionDetails.min_level}</>,
  //             <img
  //               className="evolution-chain-image"
  //               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //               alt={"Rare Candy"}
  //             />,
  //             evoArr.filter((item) => item[0] !== "min_level"),
  //           ]
  //         : [
  //             <>Level up</>,
  //             <img
  //               className="evolution-chain-image"
  //               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png`}
  //               alt={"Rare Candy"}
  //             />,
  //             evoArr.filter((item) => item[0] !== "min_level"),
  //           ];
  //     case "trade":
  //       return [
  //         evolutionDetails.trade_species ? (
  //           <>
  //             Trade for{" "}
  //             <Link
  //               className={`clean-text`}
  //               to={`/pokemon/${evolutionDetails.trade_species.name}`}
  //             >
  //               <motion.div
  //                 className="dyn-section-link"
  //                 whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
  //                 whileTap={{ scale: 0.9, rotate: "5deg" }}
  //                 transition={{ duration: 0.1 }}
  //                 style={{ display: "inline-block" }}
  //               >
  //                 {evolutionDetails.trade_species.name}
  //               </motion.div>
  //             </Link>
  //           </>
  //         ) : (
  //           <>Trade for any Pokémon</>
  //         ),
  //         <i className="fa-solid fa-rotate evolution-chain-image" />,
  //         evoArr.filter((item) => item[0] !== "trade_species"),
  //       ];
  //     case "use-item":
  //       return [<>Use</>, [], evoArr];
  //     case "shed":
  //       return [
  //         shedMapping[speciesName] ? (
  //           <>{shedMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Shed</>
  //         ),
  //         shedMapping[speciesName] ? shedMapping[speciesName][1] : "",
  //         evoArr,
  //       ];
  //     case "spin":
  //       return [
  //         spinMapping[speciesName] ? (
  //           <>{spinMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Spin</>
  //         ),
  //         spinMapping[speciesName] ? spinMapping[speciesName][1] : "",
  //         evoArr,
  //       ];
  //     case "tower-of-darkness":
  //       return [
  //         towerOfDarknessMapping[speciesName] ? (
  //           <>{towerOfDarknessMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Tower of Darkness</>
  //         ),
  //         towerOfDarknessMapping[speciesName]
  //           ? towerOfDarknessMapping[speciesName][1]
  //           : "",
  //         evoArr,
  //       ];
  //     case "tower-of-waters":
  //       return [
  //         towerOfWaterMapping[speciesName] ? (
  //           <>{towerOfWaterMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Tower of Water</>
  //         ),
  //         towerOfWaterMapping[speciesName]
  //           ? towerOfWaterMapping[speciesName][1]
  //           : "",
  //         evoArr,
  //       ];
  //     case "three-critical-hits":
  //       return [
  //         threeCriticalMapping[speciesName] ? (
  //           <>{threeCriticalMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Three critical hits</>
  //         ),
  //         threeCriticalMapping[speciesName]
  //           ? threeCriticalMapping[speciesName][1]
  //           : "",
  //         evoArr,
  //       ];
  //     case "take-damage":
  //       return [
  //         takeDamageMapping[speciesName] ? (
  //           <>{takeDamageMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Take damage</>
  //         ),
  //         takeDamageMapping[speciesName]
  //           ? takeDamageMapping[speciesName][1]
  //           : "",
  //         evoArr,
  //       ];
  //     case "other":
  //       return [
  //         otherMapping[speciesName] ? (
  //           <>{otherMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Other</>
  //         ),
  //         otherMapping[speciesName] ? otherMapping[speciesName][1] : "",
  //         evoArr,
  //       ];
  //     case "agile-style-move":
  //       return [
  //         speciesName === "wyrdeer" ? <></> : <>Agile moves</>,
  //         [],
  //         evoArr,
  //       ];
  //     case "strong-style-move":
  //       return [
  //         speciesName === "overqwil" ? <></> : <>Strong moves</>,
  //         [],
  //         evoArr,
  //       ];
  //     case "recoil-damage":
  //       return [
  //         recoilDamageMapping[speciesName] ? (
  //           <>{recoilDamageMapping[speciesName][0].props.children}</>
  //         ) : (
  //           <>Recoil damage</>
  //         ),
  //         recoilDamageMapping[speciesName]
  //           ? recoilDamageMapping[speciesName][1]
  //           : "",
  //         evoArr,
  //       ];
  //     default:
  //       return [<>Not found: {evolutionDetails.trigger.name}</>, [], evoArr];
  //   }
  // };

  // // Mapping for possible genders
  // const genderMapping = {
  //   1: ["Female", <i className="fa-solid fa-venus evolution-chain-image" />],
  //   2: ["Male", <i className="fa-solid fa-mars evolution-chain-image" />],
  //   3: ["Genderless", []],
  // };

  // // Mapping for possible stat comparisons
  // const relativeStatsMapping = {
  //   0: [
  //     "attack is less than defense",
  //     <i className="fa-solid fa-shield evolution-chain-image" />,
  //   ],
  //   1: ["attack is equal to defense", []],
  //   2: ["attack is greater than defense", []],
  // };

  // // Find the correct detail, check if it has a value and return the appropriate array containing information text
  // // and icon in JSX form
  // const getCurrDetail = (detail, triggerName) => {
  //   switch (detail[0]) {
  //     case "gender":
  //       return [
  //         <>({genderMapping[detail[1]][0]} Only)</>,
  //         genderMapping[detail[1]][1],
  //       ];
  //     case "held_item":
  //       return [
  //         <>while holding {getDetailTitle(detail[1].name)}</>,
  //         <img
  //           className="evolution-chain-image"
  //           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
  //           alt={getDetailTitle(detail[1].name)}
  //         />,
  //       ];
  //     case "item":
  //       return [
  //         <>{getDetailTitle(detail[1].name)}</>,
  //         <img
  //           className="evolution-chain-image"
  //           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail[1].name}.png`}
  //           alt={getDetailTitle(detail[1].name)}
  //         />,
  //       ];
  //     case "known_move":
  //       return [
  //         <>
  //           {triggerName !== "agile-style-move" &&
  //           triggerName !== "strong-style-move"
  //             ? "while "
  //             : ""}
  //           Pokémon knows the move {getDetailTitle(detail[1].name)}
  //         </>,
  //         "",
  //       ];
  //     case "known_move_type":
  //       return [
  //         <>
  //           {triggerName !== "agile-style-move" &&
  //           triggerName !== "strong-style-move"
  //             ? "while "
  //             : ""}
  //           Pokémon knows a {getDetailTitle(detail[1].name)} type move
  //         </>,
  //         "",
  //       ];
  //     case "location":
  //       return [
  //         <>while at {getDetailTitle(detail[1].name)}</>,
  //         <i className="fa-solid fa-signs-post evolution-chain-image" />,
  //       ];
  //     case "min_affection":
  //       return [
  //         <>with a minimum affection of {detail[1]}</>,
  //         <i className="fa-solid fa-hand-holding-heart evolution-chain-image" />,
  //       ];
  //     case "min_beauty":
  //       return [
  //         <>with a minimum beauty of {detail[1]}</>,
  //         <i className="fa-solid fa-spray-can-sparkles evolution-chain-image" />,
  //       ];
  //     case "min_happiness":
  //       return [
  //         <>with a minimum happiness of {detail[1]}</>,
  //         <i className="fa-solid fa-face-laugh-beam evolution-chain-image" />,
  //       ];
  //     case "min_level":
  //       return [<>with a minimum level of {detail[1]}</>, ""];
  //     case "needs_overworld_rain":
  //       if (detail[1] === true)
  //         return [
  //           <>while it is raining</>,
  //           <i className="fa-solid fa-cloud-rain evolution-chain-image" />,
  //         ];
  //       else {
  //         return [<></>, ""];
  //       }
  //     case "party_species":
  //       return [
  //         <>
  //           with a{" "}
  //           <Link className={`clean-text`} to={`/pokemon/${detail[1].name}`}>
  //             <motion.div
  //               className="dyn-section-link"
  //               whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
  //               whileTap={{ scale: 0.9, rotate: "5deg" }}
  //               transition={{ duration: 0.1 }}
  //               style={{ display: "inline-block" }}
  //             >
  //               {getPokeName(detail[1].name)}
  //             </motion.div>
  //           </Link>{" "}
  //           species Pokémon in their party
  //         </>,
  //         "",
  //       ];
  //     case "party_type":
  //       return [
  //         <>
  //           with a{" "}
  //           <Link className={`clean-text`} to={`/types/${detail[1].name}`}>
  //             <motion.div
  //               className="dyn-section-link"
  //               whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
  //               whileTap={{ scale: 0.9, rotate: "5deg" }}
  //               transition={{ duration: 0.1 }}
  //               style={{ display: "inline-block" }}
  //             >
  //               {getPokeName(detail[1].name)}
  //             </motion.div>
  //           </Link>{" "}
  //           type Pokémon in their party
  //         </>,
  //         "",
  //       ];
  //     case "relative_physical_stats":
  //       return [
  //         <>{relativeStatsMapping[detail[1]][0]}</>,
  //         relativeStatsMapping[detail[1]][1],
  //       ];
  //     case "time_of_day":
  //       if (detail[1] === "day")
  //         return [
  //           <>during the day</>,
  //           <i className="fa-solid fa-sun evolution-chain-image" />,
  //         ];
  //       else if (detail[1] === "night")
  //         return [
  //           <>at night</>,
  //           <i className="fa-solid fa-moon evolution-chain-image" />,
  //         ];
  //       else if (detail[1] === "") return [<></>, []];
  //       else {
  //         return [<>Not found: {detail[1]}</>, ""];
  //       }
  //     case "turn_upside_down":
  //       if (detail[1] === true)
  //         return [
  //           <> while holding the 3DS upside down</>,
  //           <i className="fa-solid fa-gamepad evolution-chain-image-upside-down" />,
  //         ];
  //       else {
  //         return [<></>, ""];
  //       }
  //     default:
  //       return ["", ""];
  //   }
  // };

  // // Iterate through the possible evolution details and call helper function
  // const getEvoDetails = (evolutionDetails, triggerName) => {
  //   let detailsArr = [],
  //     iconsArr = [];
  //   Object.entries(evolutionDetails).forEach((detail, i) => {
  //     // Only call helper function if there is a possible value for the current detail
  //     if (detail[1][1] !== null) {
  //       const [currDetail, currIcon] = getCurrDetail(detail[1], triggerName);
  //       detailsArr.push(currDetail);
  //       iconsArr.push(currIcon);
  //     }
  //   });
  //   return [detailsArr, iconsArr];
  // };

  // // Get the trigger event and description for one Pokémon to evolve to another
  // const getTriggerEvent = (evolution) => {
  //   // Iterate through the evolution details, creating line seperated sections for each
  //   const evoHTML = evolution.evolution_details.map((currDetail, i) => {
  //     // Get the trigger for the current evolution detail
  //     const [evoTrigger, iconHTML, evoArr] = getTrigger(
  //       currDetail,
  //       evolution.species.name
  //     );

  //     // Get the rest of the current evolution details and create arrays to hold the evolution details and icons
  //     let [evoTriggerArr, iconHTMLArr] = getEvoDetails(
  //       evoArr,
  //       currDetail.trigger.name
  //       // evolution.evolution_details[0].trigger.name
  //     );

  //     // Add the trigger detail and icon to the beginning of the arrays
  //     evoTriggerArr.unshift(evoTrigger);
  //     iconHTMLArr.unshift(iconHTML);

  //     // Remove any empty details
  //     evoTriggerArr = evoTriggerArr.filter(
  //       (detail) =>
  //         detail !== "" && !(Array.isArray(detail) && detail.length === 0)
  //     );

  //     // Remove any empty icons
  //     iconHTMLArr = iconHTMLArr.filter(
  //       (icon) => icon !== "" && !(Array.isArray(icon) && icon.length === 0)
  //     );

  //     // Move any items within the arrays to the end if needed
  //     [evoTriggerArr, iconHTMLArr] = moveItemToEnd(evoTriggerArr, iconHTMLArr);

  //     // Create a display for the current evolution detail string and icons
  //     return (
  //       <div className="evoluion-chain-trigger-desc" key={i}>
  //         {/* Add all strings and icons to the current evolution details display,
  //            only adding a line if we are at the last evolution detail */}
  //         {evoTriggerArr.map((trigger, j) => {
  //           return <React.Fragment key={j}>{trigger} </React.Fragment>;
  //         })}
  //         <div
  //           className={`evolution-chain-image-container ${
  //             i !== evolution.evolution_details.length - 1 ? lineStyle : ""
  //           }`}
  //         >
  //           {iconHTMLArr.map((iconHTML, j) => {
  //             return <div key={j}>{iconHTML}</div>;
  //           })}
  //         </div>
  //       </div>
  //     );
  //   });
  //   return evoHTML;
  // };

  // // Recursively get evolutions of the current Pokémon if there are any
  // const getEvolutions = (evolutions) => {
  //   return evolutions.map((evolution, i) => {
  //     return (
  //       <div
  //         className={`evolution-chain-section-horizontal ${
  //           Object.entries(pokeChainData.chain.evolves_to).length === 1
  //             ? "flex-centered"
  //             : ""
  //         }
  //           }`}
  //         key={i}
  //       >
  //         <div className="evolution-chain-icon-row">
  //           <div
  //             className={`evolution-chain-section-vertical ${
  //               screenSize === "x-large"
  //                 ? "evolution-chain-section-details-large"
  //                 : "evolution-chain-section-details-small"
  //             }`}
  //           >
  //             {getTriggerEvent(evolution[1])}
  //           </div>
  //           <i className="fa-solid fa-arrow-right-long evolution-chain-image" />
  //           <div
  //             className={`${
  //               screenSize === "x-large"
  //                 ? "evolution-chain-card-large"
  //                 : "evolution-chain-card-small"
  //             }`}
  //           >
  //             <PokemonCard
  //               obj={evolution[1].species}
  //               i={getPokeNum(evolution[1].species.url)}
  //               isDarkMode={isDarkMode}
  //             />
  //           </div>
  //         </div>
  //         {evolution[1].evolves_to && (
  //           <div
  //             className={`evolution-chain-section-vertical ${
  //               Object.entries(pokeChainData.chain.evolves_to).length === 1
  //                 ? "flex-centered"
  //                 : ""
  //             }
  //         }`}
  //           >
  //             {getEvolutions(Object.entries(evolution[1].evolves_to))}
  //           </div>
  //         )}
  //       </div>
  //     );
  //   });
  // };

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
        {/* {getEvolutions(Object.entries(pokeChainData.chain.evolves_to))} */}
      </div>
    </div>
  );
};

export default EvolutionChainHorizontal;

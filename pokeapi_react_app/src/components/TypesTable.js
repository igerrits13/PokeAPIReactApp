// import { Link } from "react-router-dom";
// import { motion } from "motion/react";
import BugType from "./icons/bug.svg";
import DarkType from "./icons/dark.svg";
import DragonType from "./icons/dragon.svg";
import ElectricType from "./icons/electric.svg";
import FairyType from "./icons/fairy.svg";
import FightingType from "./icons/fighting.svg";
import FireType from "./icons/fire.svg";
import FlyingType from "./icons/flying.svg";
import GhostType from "./icons/ghost.svg";
import GrassType from "./icons/grass.svg";
import GroundType from "./icons/ground.svg";
import IceType from "./icons/ice.svg";
import NormalType from "./icons/normal.svg";
import PoisonType from "./icons/poison.svg";
import PsychicType from "./icons/psychic.svg";
import RockType from "./icons/rock.svg";
import SteelType from "./icons/steel.svg";
import WaterType from "./icons/water.svg";
import TypesDropdown from "./TypesDropdown";
import TypesResults from "./TypesResults";

// Table showing all Pokémon types
const TypeseTable = ({ screenSize, typesResults }) => {
  // let typeStyle = "";

  // Set the type attributes for the current button
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        // typeStyle = "bug-type";
        return [BugType, "bug-type"];
      case "dark":
        // typeStyle = "dark-type";
        return [DarkType, "dark-type"];
      case "dragon":
        // typeStyle = "dragon-type";
        return [DragonType, "dragon-type"];
      case "electric":
        // typeStyle = "electric-type";
        return [ElectricType, "electric-type"];
      case "fairy":
        // typeStyle = "fairy-type";
        return [FairyType, "fairy-type"];
      case "fighting":
        // typeStyle = "fighting-type";
        return [FightingType, "fighting-type"];
      case "fire":
        // typeStyle = "fire-type";
        return [FireType, "fire-type"];
      case "flying":
        // typeStyle = "flying-type";
        return [FlyingType, "flying-type"];
      case "ghost":
        // typeStyle = "ghost-type";
        return [GhostType, "ghost-type"];
      case "grass":
        // typeStyle = "grass-type";
        return [GrassType, "grass-type"];
      case "ground":
        // typeStyle = "ground-type";
        return [GroundType, "ground-type"];
      case "ice":
        // typeStyle = "ice-type";
        return [IceType, "ice-type"];
      case "normal":
        // typeStyle = "normal-type";
        return [NormalType, "normal-type"];
      case "poison":
        // typeStyle = "poison-type";
        return [PoisonType, "poison-type"];
      case "psychic":
        // typeStyle = "psychic-type";
        return [PsychicType, "psychic-type"];
      case "rock":
        // typeStyle = "rock-type";
        return [RockType, "rock-type"];
      case "steel":
        // typeStyle = "steel-type";
        return [SteelType, "steel-type"];
      case "water":
        // typeStyle = "water-type";
        return [WaterType, "water-type"];
      default:
        return null;
    }
  }

  // let typesHTML;

  // if (screenSize === "small") {
  //   typesHTML = (
  //     <TypesDropdown typesResults={typesResults} getTypeIcon={getTypeIcon} />
  //   );
  // } else {
  //   typesHTML = (
  //     <TypesResults typesResults={typesResults} getTypeIcon={getTypeIcon} />
  //   );
  // }

  // Create buttons for each type
  // const typesHTML = typesResults
  //   .slice(0, typesResults.length - 2)
  //   .map((obj, i) => {
  //     // If in small screen mode, create dropdown menu buttons
  //     if (screenSize === "small") {
  //       const typeIcon = getTypeIcon(obj.name);
  //       return (
  //         <Link
  //           key={i}
  //           to="./"
  //           className={`types-dropdown-item hover-dim ${typeStyle}`}
  //         >
  //           <img
  //             className="types-dropdown-img"
  //             src={`${typeIcon}`}
  //             alt={`${obj.name} type icon`}
  //           />
  //           {obj.name.toUpperCase()}
  //         </Link>
  //       );
  //     }
  //     // Otherwise, create buttons in a flex-box
  //     else {
  //       const typeIcon = getTypeIcon(obj.name);
  //       return (
  //         <motion.button
  //           key={i}
  //           className={`type-item hover-dim ${typeStyle}`}
  //           whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
  //           whileTap={{ scale: 0.9, rotate: "5deg" }}
  //           transition={{ duration: 0.1 }}
  //         >
  //           <img
  //             className="type-img"
  //             src={typeIcon}
  //             alt={`${obj.name} type icon`}
  //           ></img>
  //           <div className="type-text">{obj.name.toUpperCase()}</div>
  //         </motion.button>
  //       );
  //     }
  //   });

  // If screen size is small, collapse types into dropdown
  // if (screenSize === "small") {
  //   return <div>{typesHTML}</div>;
  // <div className="types-dropdown">
  //   <button className="types-dropdown-button">Types</button>
  //   <div className="types-dropdown-content">{typesHTML}</div>
  // </div>
  // }
  // Otherwise, show full types table
  // else {
  //   return (
  //     <div>
  //       <div className="sub-header">Types</div>
  //       <div className="types-table">{typesHTML}</div>
  //     </div>
  //   );
  // }

  // return <div>{typesHTML}</div>;

  if (screenSize === "small") {
    return (
      <TypesDropdown typesResults={typesResults} getTypeIcon={getTypeIcon} />
    );
  } else {
    return (
      <TypesResults typesResults={typesResults} getTypeIcon={getTypeIcon} />
    );
  }
};

export default TypeseTable;

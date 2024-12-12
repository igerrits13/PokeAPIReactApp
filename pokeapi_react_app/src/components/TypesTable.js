import { Link } from "react-router-dom";
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

// Table showing all Pokémon types
const TypeseTable = ({ screenSize, typesResults }) => {
  let typeStyle = "";

  // Set the type attributes for the current button
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        typeStyle = "bug-type";
        return BugType;
      case "dark":
        typeStyle = "dark-type";
        return DarkType;
      case "dragon":
        typeStyle = "dragon-type";
        return DragonType;
      case "electric":
        typeStyle = "electric-type";
        return ElectricType;
      case "fairy":
        typeStyle = "fairy-type";
        return FairyType;
      case "fighting":
        typeStyle = "fighting-type";
        return FightingType;
      case "fire":
        typeStyle = "fire-type";
        return FireType;
      case "flying":
        typeStyle = "flying-type";
        return FlyingType;
      case "ghost":
        typeStyle = "ghost-type";
        return GhostType;
      case "grass":
        typeStyle = "grass-type";
        return GrassType;
      case "ground":
        typeStyle = "ground-type";
        return GroundType;
      case "ice":
        typeStyle = "ice-type";
        return IceType;
      case "normal":
        typeStyle = "normal-type";
        return NormalType;
      case "poison":
        typeStyle = "poison-type";
        return PoisonType;
      case "psychic":
        typeStyle = "psychic-type";
        return PsychicType;
      case "rock":
        typeStyle = "rock-type";
        return RockType;
      case "steel":
        typeStyle = "steel-type";
        return SteelType;
      case "water":
        typeStyle = "water-type";
        return WaterType;
      default:
        return null;
    }
  }

  // Create buttons for each type
  const typesHTML = typesResults.map((obj, i) => {
    if (screenSize === "small") {
      const typeIcon = getTypeIcon(obj.name);
      if (obj.name !== "unknown" && obj.name !== "stellar") {
        return (
          <Link
            key={i}
            to="./"
            className={`types-dropdown-item hover-dim ${typeStyle}`}
          >
            <img
              className="type-img"
              src={`${typeIcon}`}
              alt={`${obj.name} type icon`}
            />
            {obj.name.toUpperCase()}
          </Link>
        );
      } else {
        return <div key={i}></div>;
      }
    } else {
      const typeIcon = getTypeIcon(obj.name);
      if (obj.name !== "unknown" && obj.name !== "stellar") {
        return (
          <button key={i} className={`type-item hover-dim ${typeStyle}`}>
            <img
              className="type-img"
              src={typeIcon}
              alt={`${obj.name} type icon`}
            ></img>
            <div className="type-text">{obj.name.toUpperCase()}</div>
          </button>
        );
      } else {
        return <div key={i}></div>;
      }
    }
  });

  // If screen size is small, collapse types into dropdown
  if (screenSize === "small") {
    return (
      <div className="types-dropdown">
        <button className="types-dropdown-button">Types</button>
        <div className="types-dropdown-content">{typesHTML}</div>
      </div>
    );
  }
  // Otherwise, show full types table
  else {
    return (
      <div>
        <div className="sub-header">Types</div>
        <div className="types-table">{typesHTML}</div>
      </div>
    );
  }
};

export default TypeseTable;

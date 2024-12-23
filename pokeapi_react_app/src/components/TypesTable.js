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
  // Set the type attributes for the current button
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        return [BugType, "bug-type"];
      case "dark":
        return [DarkType, "dark-type"];
      case "dragon":
        return [DragonType, "dragon-type"];
      case "electric":
        return [ElectricType, "electric-type"];
      case "fairy":
        return [FairyType, "fairy-type"];
      case "fighting":
        return [FightingType, "fighting-type"];
      case "fire":
        return [FireType, "fire-type"];
      case "flying":
        return [FlyingType, "flying-type"];
      case "ghost":
        return [GhostType, "ghost-type"];
      case "grass":
        return [GrassType, "grass-type"];
      case "ground":
        return [GroundType, "ground-type"];
      case "ice":
        return [IceType, "ice-type"];
      case "normal":
        return [NormalType, "normal-type"];
      case "poison":
        return [PoisonType, "poison-type"];
      case "psychic":
        return [PsychicType, "psychic-type"];
      case "rock":
        return [RockType, "rock-type"];
      case "steel":
        return [SteelType, "steel-type"];
      case "water":
        return [WaterType, "water-type"];
      default:
        return null;
    }
  }

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

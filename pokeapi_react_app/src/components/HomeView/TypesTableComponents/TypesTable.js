import { ReactComponent as BugType } from "../../icons/TypeIcons/bug.svg";
import { ReactComponent as DarkType } from "../../icons/TypeIcons/dark.svg";
import { ReactComponent as DragonType } from "../../icons/TypeIcons/dragon.svg";
import { ReactComponent as ElectricType } from "../../icons/TypeIcons/electric.svg";
import { ReactComponent as FairyType } from "../../icons/TypeIcons/fairy.svg";
import { ReactComponent as FightingType } from "../../icons/TypeIcons/fighting.svg";
import { ReactComponent as FireType } from "../../icons/TypeIcons/fire.svg";
import { ReactComponent as FlyingType } from "../../icons/TypeIcons/flying.svg";
import { ReactComponent as GhostType } from "../../icons/TypeIcons/ghost.svg";
import { ReactComponent as GrassType } from "../../icons/TypeIcons/grass.svg";
import { ReactComponent as GroundType } from "../../icons/TypeIcons/ground.svg";
import { ReactComponent as IceType } from "../../icons/TypeIcons/ice.svg";
import { ReactComponent as NormalType } from "../../icons/TypeIcons/normal.svg";
import { ReactComponent as PoisonType } from "../../icons/TypeIcons/poison.svg";
import { ReactComponent as PsychicType } from "../../icons/TypeIcons/psychic.svg";
import { ReactComponent as RockType } from "../../icons/TypeIcons/rock.svg";
import { ReactComponent as SteelType } from "../../icons/TypeIcons/steel.svg";
import { ReactComponent as WaterType } from "../../icons/TypeIcons/water.svg";
import TypesDropdown from "./TypesDropdown";
import TypesResults from "./TypesResults";

// Table showing all Pokémon types
const TypeseTable = ({ screenSize, typesResults, isDarkMode }) => {
  // Set the type attributes for the current button base on if the user is using dark mode or not
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        return isDarkMode
          ? [BugType, "bug-type-dark"]
          : [BugType, "bug-type-light"];
      case "dark":
        return isDarkMode
          ? [DarkType, "dark-type-dark"]
          : [DarkType, "dark-type-light"];
      case "dragon":
        return isDarkMode
          ? [DragonType, "dragon-type-dark"]
          : [DragonType, "dragon-type-light"];
      case "electric":
        return isDarkMode
          ? [ElectricType, "electric-type-dark"]
          : [ElectricType, "electric-type-light"];
      case "fairy":
        return isDarkMode
          ? [FairyType, "fairy-type-dark"]
          : [FairyType, "fairy-type-light"];
      case "fighting":
        return isDarkMode
          ? [FightingType, "fighting-type-dark"]
          : [FightingType, "fighting-type-light"];
      case "fire":
        return isDarkMode
          ? [FireType, "fire-type-dark"]
          : [FireType, "fire-type-light"];
      case "flying":
        return isDarkMode
          ? [FlyingType, "flying-type-dark"]
          : [FairyType, "flying-type-light"];
      case "ghost":
        return isDarkMode
          ? [GhostType, "ghost-type-dark"]
          : [GhostType, "ghost-type-light"];
      case "grass":
        return isDarkMode
          ? [GrassType, "grass-type-dark"]
          : [GrassType, "grass-type-light"];
      case "ground":
        return isDarkMode
          ? [GroundType, "ground-type-dark"]
          : [GroundType, "ground-type-light"];
      case "ice":
        return isDarkMode
          ? [IceType, "ice-type-dark"]
          : [IceType, "ice-type-light"];
      case "normal":
        return isDarkMode
          ? [NormalType, "normal-type-dark"]
          : [NormalType, "normal-type-light"];
      case "poison":
        return isDarkMode
          ? [PoisonType, "poison-type-dark"]
          : [PoisonType, "poison-type-light"];
      case "psychic":
        return isDarkMode
          ? [PsychicType, "psychic-type-dark"]
          : [PsychicType, "psychic-type-light"];
      case "rock":
        return isDarkMode
          ? [RockType, "rock-type-dark"]
          : [RockType, "rock-type-light"];
      case "steel":
        return isDarkMode
          ? [SteelType, "steel-type-dark"]
          : [SteelType, "steel-type-light"];
      case "water":
        return isDarkMode
          ? [WaterType, "water-type-dark"]
          : [WaterType, "water-type-light"];
      default:
        return null;
    }
  }

  // If screen is small, show types as dropdown.
  if (screenSize === "small") {
    return (
      <TypesDropdown
        typesResults={typesResults}
        getTypeIcon={getTypeIcon}
        isDarkMode={isDarkMode}
      />
    );
  }
  // Otherwise, show a full types table
  else {
    return (
      <TypesResults
        typesResults={typesResults}
        getTypeIcon={getTypeIcon}
        isDarkMode={isDarkMode}
      />
    );
  }
};

export default TypeseTable;

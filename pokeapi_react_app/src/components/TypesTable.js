import { ReactComponent as BugType } from "./icons/bug.svg";
import { ReactComponent as DarkType } from "./icons/dark.svg";
import { ReactComponent as DragonType } from "./icons/dragon.svg";
import { ReactComponent as ElectricType } from "./icons/electric.svg";
import { ReactComponent as FairyType } from "./icons/fairy.svg";
import { ReactComponent as FightingType } from "./icons/fighting.svg";
import { ReactComponent as FireType } from "./icons/fire.svg";
import { ReactComponent as FlyingType } from "./icons/flying.svg";
import { ReactComponent as GhostType } from "./icons/ghost.svg";
import { ReactComponent as GrassType } from "./icons/grass.svg";
import { ReactComponent as GroundType } from "./icons/ground.svg";
import { ReactComponent as IceType } from "./icons/ice.svg";
import { ReactComponent as NormalType } from "./icons/normal.svg";
import { ReactComponent as PoisonType } from "./icons/poison.svg";
import { ReactComponent as PsychicType } from "./icons/psychic.svg";
import { ReactComponent as RockType } from "./icons/rock.svg";
import { ReactComponent as SteelType } from "./icons/steel.svg";
import { ReactComponent as WaterType } from "./icons/water.svg";
import TypesDropdown from "./TypesDropdown";
import TypesResults from "./TypesResults";

// Table showing all Pokémon types
const TypeseTable = ({ screenSize, typesResults, isDarkMode }) => {
  // Set the type attributes for the current button
  function getTypeIcon(typeName) {
    switch (typeName) {
      case "bug":
        return (isDarkMode ? [BugType, "bug-type-dark"] : [BugType, "bug-type-light"]);
      case "dark":
        return (isDarkMode ? [DarkType, "dark-type-dark"] : [DarkType, "dark-type-light"]);
      case "dragon":
        return (isDarkMode ? [DragonType, "dragon-type-dark"] : [DragonType, "dragon-type-light"]);
      case "electric":
        return (isDarkMode ? [ElectricType, "electric-type-dark"] : [ElectricType, "electric-type-light"]);
      case "fairy":
        return (isDarkMode ? [FairyType, "fairy-type-dark"] : [FairyType, "fairy-type-light"]);
      case "fighting":
        return (isDarkMode ? [FightingType, "fighting-type-dark"] : [FightingType, "fighting-type-light"]);
      case "fire":
        return (isDarkMode ? [FireType, "fire-type-dark"] : [FireType, "fire-type-light"]);
      case "flying":
        return (isDarkMode ? [FlyingType, "flying-type-dark"] : [FairyType, "flying-type-light"]);
      case "ghost":
        return (isDarkMode ? [GhostType, "ghost-type-dark"] : [GhostType, "ghost-type-light"]);
      case "grass":
        return (isDarkMode ? [GrassType, "grass-type-dark"] : [GrassType, "grass-type-light"]);
      case "ground":
        return (isDarkMode ? [GroundType, "ground-type-dark"] : [GroundType, "ground-type-light"]);
      case "ice":
        return (isDarkMode ? [IceType, "ice-type-dark"] : [IceType, "ice-type-light"]);
      case "normal":
        return (isDarkMode ? [NormalType, "normal-type-dark"] : [NormalType, "normal-type-light"]);
      case "poison":
        return (isDarkMode ? [PoisonType, "poison-type-dark"] : [PoisonType, "poison-type-light"]);
      case "psychic":
        return (isDarkMode ? [PsychicType, "psychic-type-dark"] : [PsychicType, "psychic-type-light"]);
      case "rock":
        return (isDarkMode ? [RockType, "rock-type-dark"] : [RockType, "rock-type-light"]);
      case "steel":
        return (isDarkMode ? [SteelType, "steel-type-dark"] : [SteelType, "steel-type-light"]);
      case "water":
        return (isDarkMode ? [WaterType, "water-type-dark"] : [WaterType, "water-type-light"]);
      default:
        return null;
    }
  }

  if (screenSize === "small") {
    return (
      <TypesDropdown typesResults={typesResults} getTypeIcon={getTypeIcon} isDarkMode={isDarkMode} />
    );
  } else {
    return (
      // <BugType className="type-img bug-type" />
      <TypesResults typesResults={typesResults} getTypeIcon={getTypeIcon} isDarkMode={isDarkMode} />
      // <svg
      //   fill="none"
      //   height="20"
      //   viewBox="0 0 512 512"
      //   width="20"
      //   xmlns="http://www.w3.org/2000/svg"
      // >
      //   <path
      //     className="bug-type"
      //     clip-rule="evenodd"
      //     d="m342.198.501279c.373-.5317158 1.105-.660937 1.637-.288625l36.354 25.455546c.532.3723.661 1.1051.289 1.6368l-50.599 72.2623c24.599 7.8587 41.358 16.3357 41.358 16.3357s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.7539l-55.5-66.1415c-.417-.4973-.352-1.2386.145-1.6558l33.997-28.52715c.498-.41723 1.239-.35238 1.656.14487l70.272 83.74688c6.017-.6806 12.147-1.061 18.333-1.061 8.891 0 17.771.6759 26.44 1.8229zm13.746 189.200721c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804s-71.664 56.79-71.664 177.206c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z"
      //     // fill="#a6b91a"
      //     fill-rule="evenodd"
      //   />
      // </svg>
    );
  }
};

export default TypeseTable;

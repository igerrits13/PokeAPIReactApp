import { Link } from "react-router-dom";
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
import DynamicSvgIcon from "../DynamicComponents/DynamicSvgIcon";

const SearchItemType = ({
  setSearchText,
  activeSearchIndex,
  setActiveSearchIndex,
  setIsActiveDropdown,
  resultItem,
  typeID,
  screenSize,
  isDarkMode,
  index,
}) => {
  // Setup the search results style based on if the user is using light or dark mode
  const searchResultsItemsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";

  // Map to match for each possible type case
  const typeMapping = {
    bug: [BugType, "bug-type"],
    dark: [DarkType, "dark-type"],
    dragon: [DragonType, "dragon-type"],
    electric: [ElectricType, "electric-type"],
    fairy: [FairyType, "fairy-type"],
    fighting: [FightingType, "fighting-type"],
    fire: [FireType, "fire-type"],
    flying: [FlyingType, "flying-type"],
    ghost: [GhostType, "ghost-type"],
    grass: [GrassType, "grass-type"],
    ground: [GroundType, "ground-type"],
    ice: [IceType, "ice-type"],
    normal: [NormalType, "normal-type"],
    poison: [PoisonType, "poison-type"],
    psychic: [PsychicType, "psychic-type"],
    rock: [RockType, "rock-type"],
    steel: [SteelType, "steel-type"],
    water: [WaterType, "water-type"],
  };

  // Set the type attributes for the current type based on type name and if the user is in dark mode or not
  function getTypeIcon(typeName) {
    if (typeMapping[typeName]) {
      const [typeIcon, baseClass] = typeMapping[typeName];
      const modeSuffix = isDarkMode ? "-dark" : "-light";
      return [typeIcon, `${baseClass}${modeSuffix}`];
    }
    return null;
  }

  // Capitalize the first letter of the current type
  const getTypeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  // Get the number of the current Pokémon based on its url
  const getTypeNum = (obj) => {
    const urlSections = obj.url.split("/");
    const cleanSection = urlSections.filter((section) => section !== "");
    const endSection = cleanSection[cleanSection.length - 1];
    const urlNum = parseInt(endSection, 10);
    return urlNum;
  };

  const handleOnClick = () => {
    setSearchText("");
    setIsActiveDropdown(false);
  };

  // Store informaiton for the current type item
  const typeIdURL = `/types/${getTypeNum(resultItem)}`;
  const [typeIcon, typeStyle] = getTypeIcon(resultItem.name);

  // Display the current search result item
  return (
    <Link
      className={`search-results-item clean-text ${searchResultsItemsStyle} ${
        activeSearchIndex === index && screenSize !== "small"
          ? "search-results-item-active"
          : ""
      }`}
      to={typeIdURL}
      onClick={handleOnClick}
      onMouseEnter={() => setActiveSearchIndex(index)}
    >
      <div>
        <DynamicSvgIcon
          classes={`search-result-type-image ${typeStyle}`}
          IconComponent={typeIcon}
        />
        {getTypeName(resultItem.name)}
      </div>
      <div>#{getTypeNum(resultItem)}</div>
    </Link>
  );
};

export default SearchItemType;

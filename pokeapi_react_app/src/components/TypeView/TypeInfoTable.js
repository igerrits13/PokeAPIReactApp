import { ReactComponent as BugType } from "../icons/bug.svg";
import { ReactComponent as DarkType } from "../icons/dark.svg";
import { ReactComponent as DragonType } from "../icons/dragon.svg";
import { ReactComponent as ElectricType } from "../icons/electric.svg";
import { ReactComponent as FairyType } from "../icons/fairy.svg";
import { ReactComponent as FightingType } from "../icons/fighting.svg";
import { ReactComponent as FireType } from "../icons/fire.svg";
import { ReactComponent as FlyingType } from "../icons/flying.svg";
import { ReactComponent as GhostType } from "../icons/ghost.svg";
import { ReactComponent as GrassType } from "../icons/grass.svg";
import { ReactComponent as GroundType } from "../icons/ground.svg";
import { ReactComponent as IceType } from "../icons/ice.svg";
import { ReactComponent as NormalType } from "../icons/normal.svg";
import { ReactComponent as PoisonType } from "../icons/poison.svg";
import { ReactComponent as PsychicType } from "../icons/psychic.svg";
import { ReactComponent as RockType } from "../icons/rock.svg";
import { ReactComponent as SteelType } from "../icons/steel.svg";
import { ReactComponent as WaterType } from "../icons/water.svg";
import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";
import TypeInfo from "./TypeInfo";
import DamageRelations from "./DamageRelations";

// Table of information for the currently selected type
const TypeInfoTable = ({
  isTypesLoading,
  typeData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font, header and icon styles based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "typeview-header-small"
      : screenSize === "medium"
      ? "typeview-header-med"
      : screenSize === "large"
      ? "typeview-header-large"
      : "typeview-header-x-large";
  const iconStyle = isDarkMode
    ? "component-background-dark component-rounded-outline-thin-dark"
    : "component-background-light component-rounded-outline-thin-light";

  // Set the type attributes for the current type based on type name and if the user is in dark mode or not
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

  // Get the styling for the current type
  let typeIcon, typeStyle;
  if (!isTypesLoading) {
    [typeIcon, typeStyle] = getTypeIcon(typeData.name);
  }

  // When the types have loaded, display the type information table showing basic information, damage relations and
  // the current type's icon
  return (
    !isTypesLoading && (
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "typeview-table-small-med"
            : "typeview-table-large"
        } ${fontStyle}`}
      >
        <TypeInfo typeData={typeData} isDarkMode={isDarkMode} />
        {/* Only show the "Damage Relations" title when screen is small or medium */}
        {(screenSize === "small" || screenSize === "medium") && (
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
            Damage Relations
          </div>
        )}
        <DamageRelations
          isTypesLoading={isTypesLoading}
          typeData={typeData}
          getTypeIcon={getTypeIcon}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
        {/* ONly show the current types large icon when screen is large or x-large */}
        {(screenSize === "large" || screenSize === "x-large") && (
          <div className={`typeview-table-icon-container`}>
            <div className={`typeview-table-icon-outline ${iconStyle}`}>
              <DynamicSvgIcon
                classes={`typeview-table-icon ${typeStyle}`}
                IconComponent={typeIcon}
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default TypeInfoTable;

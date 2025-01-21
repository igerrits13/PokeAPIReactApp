import { Link } from "react-router-dom";
import { motion } from "motion/react";
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

const TypeInfoTable = ({
  isTypesLoading,
  typeData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
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
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";
  const buttonSize =
    screenSize === "small"
      ? "typeview-info-icon-small"
      : screenSize === "med"
      ? "typeview-info-icon-med"
      : "typeview-info-icon-large";

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

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  // Return the name of the current game in formatted form
  const getSectionTitle = (section) => {
    return section
      .split("_")
      .map(
        (currWord) =>
          currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase()
      )
      .join(" ");
  };

  // Setup the styling for the current type
  let typeIcon, typeStyle;
  if (!isTypesLoading) {
    [typeIcon, typeStyle] = getTypeIcon(typeData.name);
  }

  // Display damage relations section of the type information table
  const damageRelationsHTML = !isTypesLoading
    ? Object.entries(typeData.damage_relations).map(([obj, icons], i) => {
        if (icons.length > 0) {
          return (
            <div
              key={i}
              className={`typeview-table-info-section ${
                i < Object.entries(typeData.damage_relations).length - 1
                  ? lineStyle
                  : ""
              }`}
            >
              <div className="typeview-info-name">{getSectionTitle(obj)}</div>
              <div className="typeview-info-icon-container">
                {Object.entries(icons).map((icon, i) => {
                  const [currTypeIcon, currTypeStyle] = getTypeIcon(
                    icon[1].name
                  );
                  // Get the id for the current type to add to the Link
                  const urlArr = icon[1].url.split("/");
                  const urlNoSlash = urlArr.filter((part) => part !== "");
                  const urlNumber = urlNoSlash[urlNoSlash.length - 1];
                  const typeNum = parseInt(urlNumber, 10);
                  const typeIdUrl = `/types/${typeNum}`;
                  return (
                    <Link key={i} className="clean-text" to={typeIdUrl}>
                      <motion.button
                        className={`hover-dim ${
                          screenSize === "small"
                            ? "typeview-info-button-small"
                            : "typeview-info-button-med-large"
                        } ${iconStyle}`}
                        whileHover={{ scale: 1.1, rotate: "-5deg" }}
                        whileTap={{ scale: 0.9, rotate: "5deg" }}
                        transition={{ duration: 0.1 }}
                      >
                        <DynamicSvgIcon
                          classes={`${buttonSize} ${currTypeStyle}`}
                          IconComponent={currTypeIcon}
                        />
                      </motion.button>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={i}
              className={`typeview-table-info-section ${
                i < Object.entries(typeData.damage_relations).length - 1
                  ? lineStyle
                  : ""
              }`}
            >
              <div className="typeview-info-name">{getSectionTitle(obj)}</div>
              <div className="typeview-info-icon-container">None</div>
            </div>
          );
        }
      })
    : null;
  // <div>
  {
    /* {!isTypesLoading ? (
        <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
          {typeData.name[0].toUpperCase() + typeData.name.slice(1)} Type
        </div>
      ) : (
        <></>
      )} */
  }
  // {!isTypesLoading ? (

  if (!isTypesLoading) {
    return (
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "typeview-table-small-med"
            : "typeview-table-large"
        } ${fontStyle}`}
      >
        <div className="typeview-table-info">
          <div className={`typeview-table-info-section ${lineStyle}`}>
            <div className="typeview-table-info-name">Type ID</div>
            <div className="typeview-table-info-result">#{typeData.id}</div>
          </div>
          <div className={`typeview-table-info-section ${lineStyle}`}>
            <div className="typeview-table-info-name">Generation</div>
            <div className="typeview-table-info-result">
              {getGenerationTitle(typeData.generation.name)}
            </div>
          </div>
          <div className="typeview-table-info-section">
            <div className="typeview-table-info-name">Move Damage Class</div>
            <div className="typeview-table-info-result">
              {typeData.move_damage_class
                ? typeData.move_damage_class.name[0].toUpperCase() +
                  typeData.move_damage_class.name.slice(1)
                : "None"}
            </div>
          </div>
        </div>
        {screenSize === "small" || screenSize === "medium" ? (
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
            Damage Relations
          </div>
        ) : null}
        <div className="typeview-table-damage-relations">
          {damageRelationsHTML}
        </div>
        {screenSize === "large" || screenSize === "x-large" ? (
          <div className={`typeview-table-icon-container`}>
            <div className={`typeview-table-icon-outline ${iconStyle}`}>
              <DynamicSvgIcon
                classes={`typeview-table-icon ${typeStyle}`}
                IconComponent={typeIcon}
              />
            </div>
          </div>
        ) : null}{" "}
      </div>
    );
  }
  // ) : (
  // <></>
  // )}
  // ;
  // </div>
  // );
  // }}}
};

export default TypeInfoTable;

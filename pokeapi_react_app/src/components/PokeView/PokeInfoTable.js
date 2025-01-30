import { useState } from "react";
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
import TypesResultsItem from "../HomeView/TypesResultsItem";
import DynamicTableSection from "../CommonComponents/DynamicTableSection";

const PokeInfoTable = ({
  pokeData,
  pokeSpeciesData,
  isPokeLoading,
  isDarkMode,
  screenSize,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";
  // Setup the type results and text style based on if the user is using light or dark mode
  const imageToggleStyle = isDarkMode
    ? "component-background-dark"
    : "component-background-light";
  const imageVersionFontStyle = isDarkMode
    ? "option-font-dark clean-border"
    : "option-font-light clean-border";
  const activeImageVersionFontStyle = isDarkMode
    ? "option-font-dark-active component-outline-dark"
    : "option-font-light-active component-outline-light";

  const [isNormalToggle, setIsNormalToggle] = useState(true);

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  const getHeight = (height) => {
    const metric = height / 10;
    const imperial = height * 3.93701;
    const feet = Math.floor(imperial / 12);
    const inches = Math.floor(imperial % 12);
    return `${metric.toFixed(1)}m (${feet}' ${inches}")`;
  };

  const getWeight = (weight) => {
    const metric = weight * 0.1;
    const imperial = weight * 0.220462;
    return `${metric.toFixed(1)}kg (${imperial.toFixed(1)} lbs)`;
  };

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

  // Lines to be displayed for the basic type information table. Only add move damage class if it is not null
  const pokeInfo = [
    { text: "Pokémon ID", info: `#${pokeData.id}`, id: 0 },
    {
      text: "Generation",
      info: `${getGenerationTitle(pokeSpeciesData.generation.name)}`,
      id: 1,
    },
    { text: "Height", info: `${getHeight(pokeData.height)}`, id: 2 },
    { text: "Weight", info: `${getWeight(pokeData.weight)}`, id: 3 },
    {
      text: "Shape",
      info: `${
        pokeSpeciesData.shape.name[0].toUpperCase() +
        pokeSpeciesData.shape.name.slice(1)
      }`,
      id: 4,
    },
    {
      text: "Habitat",
      info: `${
        pokeSpeciesData?.habitat?.name !== undefined &&
        pokeSpeciesData?.habitat?.name !== null
          ? pokeSpeciesData.habitat.name[0].toUpperCase() +
            pokeSpeciesData.habitat.name.slice(1)
          : "None"
      }`,
      id: 5,
    },
    {
      text: "Color",
      info: `${
        pokeSpeciesData.color.name[0].toUpperCase() +
        pokeSpeciesData.color.name.slice(1)
      }`,
      id: 6,
    },
  ];

  // console.log(pokeSpeciesData.habitat.name);

  // Set the type attributes for the current type based on type name and if the user is in dark mode or not
  function getTypeIcon(typeName) {
    if (typeMapping[typeName]) {
      const [typeIcon, baseClass] = typeMapping[typeName];
      const modeSuffix = isDarkMode ? "-dark" : "-light";
      return [typeIcon, `${baseClass}${modeSuffix}`];
    }
    return null;
  }

  // Get the styling for the current type
  let typeIcon, typeStyle, typeIconsHTML;
  if (!isPokeLoading) {
    typeIconsHTML = (
      <div className="types-box">
        {Object.entries(pokeData.types).map((obj) => {
          [typeIcon, typeStyle] = getTypeIcon(obj[1].type.name);
          return (
            <TypesResultsItem
              key={obj[0]}
              obj={obj[1].type}
              typeIcon={typeIcon}
              typeStyle={typeStyle}
              isDarkMode={isDarkMode}
            />
          );
        })}
      </div>
    );
  }

  const handleNormalMode = () => {
    setIsNormalToggle(true);
  };

  const handleShinyMode = () => {
    setIsNormalToggle(false);
  };

  return (
    <div
      className={`${
        screenSize === "small" || screenSize === "medium"
          ? "secondary-grid-row-small-med"
          : "secondary-grid-row-large"
      } ${fontStyle}`}
    >
      {" "}
      {screenSize === "small" || screenSize === "medium" ? (
        <>
          <div className="secondary-table-conainer-50">
            <div className="pokeview-image-container">
              <img
                className="pokeview-image"
                src={
                  isNormalToggle
                    ? pokeData.sprites.other["official-artwork"].front_default
                    : pokeData.sprites.other["official-artwork"].front_shiny
                }
                alt={`${pokeData.name}`}
              />
              <div className="pokeview-image-toggle">
                <button
                  onClick={handleNormalMode}
                  className={`pokeview-image-toggle-normal ${imageToggleStyle} ${
                    isNormalToggle
                      ? activeImageVersionFontStyle
                      : imageVersionFontStyle
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={handleShinyMode}
                  className={`pokeview-image-toggle-shiny ${imageToggleStyle} ${
                    isNormalToggle
                      ? imageVersionFontStyle
                      : activeImageVersionFontStyle
                  }`}
                >
                  Shiny
                </button>
              </div>
            </div>
          </div>
          <div className="secondary-table-conainer-50">
            {!isPokeLoading && (
              <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
                {pokeData.name[0].toUpperCase() + pokeData.name.slice(1)}
              </div>
            )}
            {typeIconsHTML}
            {!isPokeLoading && (
              <div
                className={`${
                  screenSize === "small" || screenSize === "medium"
                    ? "description-box-small-med"
                    : "description-box-large"
                } ${fontStyle}`}
              >
                {pokeSpeciesData.flavor_text_entries[0].flavor_text}
              </div>
            )}
            <DynamicTableSection
              sectionInfo={pokeInfo}
              isDarkMode={isDarkMode}
            />
          </div>
        </>
      ) : (
        <>
          <div className="secondary-table-conainer-50">
            {!isPokeLoading && (
              <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
                {pokeData.name[0].toUpperCase() + pokeData.name.slice(1)}
              </div>
            )}
            {typeIconsHTML}
            {!isPokeLoading && (
              <div
                className={`${
                  screenSize === "small" || screenSize === "medium"
                    ? "description-box-small-med"
                    : "description-box-large"
                } ${fontStyle}`}
              >
                {pokeSpeciesData.flavor_text_entries[0].flavor_text}
              </div>
            )}
            <DynamicTableSection
              sectionInfo={pokeInfo}
              isDarkMode={isDarkMode}
            />
          </div>
          <div className="secondary-table-conainer-50">
            <div className="pokeview-image-container">
              <img
                className="pokeview-image"
                src={
                  isNormalToggle
                    ? pokeData.sprites.other["official-artwork"].front_default
                    : pokeData.sprites.other["official-artwork"].front_shiny
                }
                alt={`${pokeData.name}`}
              />
              <div className="pokeview-image-toggle">
                <button
                  onClick={handleNormalMode}
                  className={`pokeview-image-toggle-normal ${imageToggleStyle} ${
                    isNormalToggle
                      ? activeImageVersionFontStyle
                      : imageVersionFontStyle
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={handleShinyMode}
                  className={`pokeview-image-toggle-shiny ${imageToggleStyle} ${
                    isNormalToggle
                      ? imageVersionFontStyle
                      : activeImageVersionFontStyle
                  }`}
                >
                  Shiny
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeInfoTable;

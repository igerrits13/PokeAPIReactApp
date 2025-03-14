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
import { ReactComponent as UnknownType } from "../../icons/TypeIcons/unknown.svg";
import TypesResultsItem from "../../HomeView/TypesTableComponents/TypesResultsItem";
import DynamicTableSection from "../../CommonComponents/DynamicComponents/DynamicTableSection";

// Basic information of current Pokémon
const PokeBasicInfo = ({
  pokeData,
  pokeSpeciesData,
  whosThatPokemon,
  screenSize,
  isDarkMode,
}) => {
  // Set the styles for font, headers and the Pokémon description based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";
  const pokemonDescStyle =
    screenSize === "small"
      ? "pokemon-desc-small"
      : screenSize === "medium"
      ? "pokemon-desc-med"
      : screenSize === "large"
      ? "pokemon-desc-large"
      : "pokemon-desc-x-large";

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
    unknown: [UnknownType, "unknown-type"],
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

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  // Get the first English genus for the current Pokémon
  const genusInfo = pokeSpeciesData.genera.find(
    (obj) => obj.language.name === "en"
  )?.genus;

  // Convert height from decimeters to meters/feet and inches
  const getHeight = (height) => {
    const metric = height / 10;
    const imperial = height * 3.93701;
    const feet = Math.floor(imperial / 12);
    const inches = Math.floor(imperial % 12);
    return `${metric.toFixed(1)}m (${feet}' ${inches}")`;
  };

  // Convert weight from hectograms to kilograms and pounds
  const getWeight = (weight) => {
    const metric = weight * 0.1;
    const imperial = weight * 0.220462;
    return `${metric.toFixed(1)}kg (${imperial.toFixed(1)} lbs)`;
  };

  // Lines to be displayed for the basic type information table
  const pokeInfo = [
    {
      text: "Pokémon ID",
      info: whosThatPokemon ? "#????" : `#${pokeSpeciesData.id}`,
      id: 0,
    },
    {
      text: "Introduced",
      info: whosThatPokemon
        ? "????"
        : `${getGenerationTitle(pokeSpeciesData.generation.name)}`,
      id: 1,
    },
    {
      text: "Classification",
      info: whosThatPokemon ? "????" : `${genusInfo}`,
      id: 2,
    },
    {
      text: "Height",
      info: whosThatPokemon ? "????" : `${getHeight(pokeData.height)}`,
      id: 3,
    },
    {
      text: "Weight",
      info: whosThatPokemon ? "????" : `${getWeight(pokeData.weight)}`,
      id: 4,
    },
    {
      text: "Shape",
      info: whosThatPokemon
        ? "????"
        : `${
            pokeSpeciesData.shape.name[0].toUpperCase() +
            pokeSpeciesData.shape.name.slice(1)
          }`,
      id: 5,
    },
    {
      text: "Color",
      info: whosThatPokemon
        ? "????"
        : `${
            pokeSpeciesData.color.name[0].toUpperCase() +
            pokeSpeciesData.color.name.slice(1)
          }`,
      id: 6,
    },
  ];

  // Get the styling for the current type
  let typeIcon, typeStyle;
  const typeIconsHTML = (
    <div className="types-box">
      {Object.entries(pokeData.types).map((obj) => {
        [typeIcon, typeStyle] = getTypeIcon(
          whosThatPokemon ? "unknown" : obj[1].type.name
        );
        return (
          <TypesResultsItem
            key={obj[0]}
            obj={whosThatPokemon ? { name: "????", url: "" } : obj[1].type}
            typeIcon={typeIcon}
            typeStyle={typeStyle}
            isDisabled={whosThatPokemon ? true : false}
            isDarkMode={isDarkMode}
          />
        );
      })}
    </div>
  );

  // Get the first English flavor text for the current Pokémon
  const flavorText = pokeSpeciesData.flavor_text_entries.find(
    (obj) => obj.language.name === "en"
  )?.flavor_text;

  // Display basic Pokémon information
  return (
    <div className="secondary-table-conainer-50">
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        {whosThatPokemon ? "????" : getPokeName(pokeData.species.name)}
      </div>
      {typeIconsHTML}
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "description-box-small-med"
            : "description-box-large"
        } ${pokemonDescStyle} ${fontStyle}`}
      >
        {whosThatPokemon ? "????" : flavorText}
      </div>
      <DynamicTableSection sectionInfo={pokeInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default PokeBasicInfo;

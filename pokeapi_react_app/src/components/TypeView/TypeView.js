import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as BugType } from "../icons/TypeIcons/bug.svg";
import { ReactComponent as DarkType } from "../icons/TypeIcons/dark.svg";
import { ReactComponent as DragonType } from "../icons/TypeIcons/dragon.svg";
import { ReactComponent as ElectricType } from "../icons/TypeIcons/electric.svg";
import { ReactComponent as FairyType } from "../icons/TypeIcons/fairy.svg";
import { ReactComponent as FightingType } from "../icons/TypeIcons/fighting.svg";
import { ReactComponent as FireType } from "../icons/TypeIcons/fire.svg";
import { ReactComponent as FlyingType } from "../icons/TypeIcons/flying.svg";
import { ReactComponent as GhostType } from "../icons/TypeIcons/ghost.svg";
import { ReactComponent as GrassType } from "../icons/TypeIcons/grass.svg";
import { ReactComponent as GroundType } from "../icons/TypeIcons/ground.svg";
import { ReactComponent as IceType } from "../icons/TypeIcons/ice.svg";
import { ReactComponent as NormalType } from "../icons/TypeIcons/normal.svg";
import { ReactComponent as PoisonType } from "../icons/TypeIcons/poison.svg";
import { ReactComponent as PsychicType } from "../icons/TypeIcons/psychic.svg";
import { ReactComponent as RockType } from "../icons/TypeIcons/rock.svg";
import { ReactComponent as SteelType } from "../icons/TypeIcons/steel.svg";
import { ReactComponent as WaterType } from "../icons/TypeIcons/water.svg";
import ScrollToTop from "../CommonComponents/ScrollToTop";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import TypeInfoTable from "./TypeInfoTable";
import DynamicTabOptions from "../CommonComponents/DynamicComponents/DynamicTabOptions";
import CardsTab from "./TabComponents/CardsTab";
import MovesTab from "./TabComponents/MovesTab";
import SpritesTab from "./TabComponents/SpritesTab";
import Footer from "../CommonComponents/Footer";

// Typeview page of the Pokémon app
const TypeView = ({
  pokeResults,
  setPokeResults,
  fullPokeResults,
  pokeCountTotal,
  filterByGen,
  setFilterByGen,
  sortBy,
  setSortBy,
  screenSize,
  isDarkMode,
}) => {
  // Setup data structures to get the id of the type, store type data of the current type,
  // setup the loading, error state for the API call and page navigation, and what tab is currently active
  const { id } = useParams();
  const [typeData, setTypeData] = useState([]);
  const [isTypesLoading, setIsTypesLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);

  // Setup the font and header style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "typeview-small"
      : screenSize === "medium"
      ? "typeview-med"
      : "typeview-large";

  // Fetch data for the current type
  useEffect(() => {
    const fetchData = async () => {
      // Check if the id is within the valid types
      if ((id > 0 && id < 19) || isNaN(id)) {
        setIsTypesLoading(true);
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/type/${id}/`);
          if (!response.ok) {
            navigate("/notfound");
            return;
          }
          const jsonData = await response.json();
          setTypeData(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setIsTypesLoading(false);
        }
      } else {
        setIsTypesLoading(false);
        navigate("/notfound");
        return;
      }
    };

    fetchData();
  }, [id, navigate]);

  // Reset sort options on initial page load
  useEffect(() => {
    setFilterByGen(["all"]);
    setSortBy("number");
  }, [setFilterByGen, setSortBy]);

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

  // Tabs to be displayed within types view and currently active tab
  const tabLabels = [
    { label: "Pokémon" },
    { label: "Moves" },
    { label: "Sprites" },
  ];
  const activeTab = tabLabels[activeButton].label;

  // If the API call returns an error, navigate to the page not found
  // (Redundant to inside fetch call to avoid compilation error)
  if (error) {
    navigate("/notfound");
    return;
  }

  console.log(typeData.name);

  // Display the type view page from its components, displaying the currently active tab
  return (
    <div
      className={`typeview-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <ScrollToTop isDarkMode={isDarkMode} />
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      {!isTypesLoading && (
        <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
          {typeData.name[0].toUpperCase() + typeData.name.slice(1)} Type
        </div>
      )}
      <TypeInfoTable
        isTypesLoading={isTypesLoading}
        typeData={typeData}
        getTypeIcon={getTypeIcon}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <DynamicTabOptions
        tabLabels={tabLabels}
        setActiveButton={setActiveButton}
        activeButton={activeButton}
        isDarkMode={isDarkMode}
        screenSize={screenSize}
      />
      {activeTab === "Pokémon" && (
        <CardsTab
          pokeResults={pokeResults}
          setPokeResults={setPokeResults}
          pokeCountTotal={pokeCountTotal}
          filterByGen={filterByGen}
          setFilterByGen={setFilterByGen}
          typeData={typeData}
          setTypeData={setTypeData}
          isTypesLoading={isTypesLoading}
          setIsTypesLoading={setIsTypesLoading}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isDarkMode={isDarkMode}
          screenSize={screenSize}
        />
      )}
      {activeTab === "Moves" && (
        <MovesTab
          typeData={typeData}
          isTypesLoading={isTypesLoading}
          getTypeIcon={getTypeIcon}
          isDarkMode={isDarkMode}
        />
      )}
      {activeTab === "Sprites" && (
        <SpritesTab
          typeData={typeData}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      )}
      <Footer isDarkMode={isDarkMode} screenSize={screenSize} />
    </div>
  );
};

export default TypeView;

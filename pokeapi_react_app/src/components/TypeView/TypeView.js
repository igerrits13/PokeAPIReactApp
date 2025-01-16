import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
// import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";
import DynamicTabOptions from "../CommonComponents/DynamicTabOptions";
import CardsTab from "./CardsTab";
import MovesTab from "./MovesTab";
import SpritesTab from "./SpritesTab";
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
  // Setup data structures to store type data of the current type
  const [typeData, setTypeData] = useState([]);
  // Get the id of the type and setup the loading state for the API call
  const { id } = useParams();
  const [isTypesLoading, setIsTypesLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data for the current type
  useEffect(() => {
    // If the type searched for is not a valid ID, redirect to page not found
    if (id >= 19 || isNaN(id)) {
      navigate("/notfound");
      return;
    }
    fetch(`https://pokeapi.co/api/v2/type/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTypeData(data);
        setIsTypesLoading(false);
      });
  }, [id, setIsTypesLoading, navigate]);

  // let typeIcon, typeStyle;

  // if (!isTypesLoading) {
  //   [typeIcon, typeStyle] = getTypeIcon(typeData.name);
  // }

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "typeview-small"
      : screenSize === "medium"
      ? "typeview-med"
      : "typeview-large";

  // Reset sort options
  useEffect(() => {
    setFilterByGen("all");
    setSortBy("number");
  }, [setFilterByGen, setSortBy]);

  // Tabs to be displayed
  const tabLabels = [
    { label: "Pokémon" },
    { label: "Moves" },
    { label: "Sprites" },
  ];

  // State to keep track of the tab that is currently active, then get the name of that tab
  const [activeButton, setActiveButton] = useState(0);
  const activeTab = tabLabels[activeButton].label;

  // Display the type view page from its components
  return (
    <div
      className={`typeview-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      {/* <DynamicSvgIcon
        classes={`type-img ${typeStyle}`}
        IconComponent={typeIcon}
      /> */}
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
      {activeTab === "Moves" && <MovesTab />}
      {activeTab === "Sprites" && (
        <SpritesTab typeData={typeData} isDarkMode={isDarkMode} />
      )}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypeView;

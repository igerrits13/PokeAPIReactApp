import { useState, useEffect } from "react";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
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
  const tabLabels = ["Pokémon", "Moves", "Sprites"];

  // State to keep track of the tab that is currently active, then get the name of that tab
  const [activeButton, setActiveButton] = useState(0);
  const activeTab = tabLabels[activeButton];

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
      {/* {tabOptions} */}
      <DynamicTabOptions
        tabLabels={tabLabels}
        setActiveButton={setActiveButton}
        activeButton={activeButton}
        isDarkMode={isDarkMode}
        screenSize={screenSize}
      />
      <CardsTab
        pokeResults={pokeResults}
        setPokeResults={setPokeResults}
        pokeCountTotal={pokeCountTotal}
        filterByGen={filterByGen}
        setFilterByGen={setFilterByGen}
        activeTab={activeTab}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isDarkMode={isDarkMode}
        screenSize={screenSize}
      />
      <MovesTab activeTab={activeTab} />
      <SpritesTab activeTab={activeTab} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypeView;

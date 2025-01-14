import { useState, useEffect } from "react";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import CardsTab from "./CardsTab";
import MovesTab from "./MovesTab";
import SpritesTab from "./SpritesTab";
import Footer from "../CommonComponents/Footer";

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

  // Tab option code

  // Setup the search bar style based on if the user is using light or dark mode
  const tabOptionFontStyle = isDarkMode
    ? "taboption-font-dark"
    : "taboption-font-light";
  const activeTabOptionFontStyle = isDarkMode
    ? "taboption-font-dark-active"
    : "taboption-font-light-active";

  // Adjust the gap between tab options based on screen size
  const tabPaddingSize =
    screenSize === "small"
      ? "tab-button-small"
      : screenSize === "medium"
      ? "tab-button-med"
      : "tab-button-large";

  // State to keep track of the tab that is currently active, then get the name of that tab
  const [activeButton, setActiveButton] = useState(0);
  // const [activeTab, setActiveTab] = useState(tabLabels[0]);
  const activeTab = tabLabels[activeButton];

  // Update the active tab on click
  const handleTabOptions = (i) => {
    setActiveButton(i);
  };

  // Tabs to view the type page's Pokémon, move sets and sprites
  const tabOptions = (
    <div>
      {tabLabels.map((label, i) => {
        return (
          <button
            key={i}
            className={`tab-button ${tabPaddingSize} ${tabOptionFontStyle} ${
              activeButton === i ? activeTabOptionFontStyle : ""
            }`}
            onClick={() => handleTabOptions(i)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );

  // End of tab options code

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
      {tabOptions}
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
      {activeTab === "Moves" ? "This is the moves tab!" : ""}
      {activeTab === "Sprites" ? "This is the sprites tab!" : ""}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypeView;

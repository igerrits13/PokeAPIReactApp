import { useState, useEffect } from "react";
import { motion } from "motion/react";
import BattleDisplay from "../BattleDisplayComponents/BattleDisplay";
import PokeImage from "./PokeImage";

// Allow user to toggle between the battle and art Poké display
const BattleImageToggle = ({ pokeData, isDarkMode }) => {
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
  const battleToggleStyle = isDarkMode
    ? "icon-dark component-outline-background-dark"
    : "icon-light component-outline-background-light";

  // State to track which view should be showing
  const [battleView, setBattleView] = useState(true);
  const [isNormalToggle, setIsNormalToggle] = useState(true);

  useEffect(() => {
    setBattleView(
      pokeData.sprites.other.showdown.front_default !== null ? true : false
    );
  }, [pokeData]);

  // Functions to handle toggling between normal and shiny mode
  const handleNormalMode = () => {
    setIsNormalToggle(true);
  };

  const handleShinyMode = () => {
    setIsNormalToggle(false);
  };

  // Display the toggle and appropriate view
  return (
    <div className="secondary-table-conainer-50">
      {battleView ? (
        <BattleDisplay pokeData={pokeData} isNormalToggle={isNormalToggle} />
      ) : (
        <PokeImage pokeData={pokeData} isNormalToggle={isNormalToggle} />
      )}
      <div className="pokeview-image-toggle">
        <button
          onClick={handleNormalMode}
          className={`${
            pokeData.sprites.other["official-artwork"].front_shiny === null
              ? "pokeview-image-normal-only"
              : "pokeview-image-toggle-normal"
          } ${imageToggleStyle} ${
            isNormalToggle ? activeImageVersionFontStyle : imageVersionFontStyle
          }`}
        >
          Normal
        </button>
        {pokeData.sprites.other["official-artwork"].front_shiny && (
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
        )}
      </div>{" "}
      {pokeData.sprites.other.showdown.front_default !== null && (
        <div className="pokeview-toggle-container">
          Battle
          <div
            className={`pokeview-toggle ${battleToggleStyle}`}
            data-battleview={battleView}
            onClick={() => setBattleView(!battleView)}
          >
            <motion.div
              className="pokeview-toggle-handle component-background-light"
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            />
          </div>
          Artwork
        </div>
      )}
    </div>
  );
};

export default BattleImageToggle;

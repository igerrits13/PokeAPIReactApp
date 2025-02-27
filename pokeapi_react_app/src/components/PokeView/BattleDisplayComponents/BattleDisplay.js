import { useState } from "react";

const BattleDisplay = ({ pokeData, isDarkMode }) => {
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

  // Functions to handle toggling between normal and shiny mode
  const handleNormalMode = () => {
    setIsNormalToggle(true);
  };

  const handleShinyMode = () => {
    setIsNormalToggle(false);
  };

  return (
    <div className="pokeview-image-container">
      {/* <div className="battle-display-container"> */}
      <div className="pokeview-image"> Div </div>
      {/* </div> */}
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
      </div>
    </div>
  );
};

export default BattleDisplay;

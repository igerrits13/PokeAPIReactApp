import { useState } from "react";

const PokeImage = ({ pokeData, isDarkMode }) => {
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
    <div className="secondary-table-conainer-50">
      <div className="pokeview-image-container">
        <img
          className="pokeview-image"
          src={
            isNormalToggle
              ? pokeData.sprites.other["official-artwork"].front_default
              : pokeData.sprites.other["official-artwork"].front_shiny
          }
          alt={`${pokeData.species.name}`}
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
  );
};

export default PokeImage;

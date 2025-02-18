import React from "react";
import SpritesTableBasic from "./SpritesTableBasic";
import SpritesTableVersions from "./SpritesTableVersions";
import SpritesTableOther from "./SpritesTableOther";

// Basic table for displaying all of the current Pokémon's sprites
const SpritesTable = ({ pokeData, screenSize, isDarkMode }) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Render the full sprites table
  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        {getPokeName(pokeData.name)} Sprites
      </div>
      <div className="spritestab-container">
        <SpritesTableBasic
          pokeData={pokeData}
          getPokeName={getPokeName}
          isDarkMode={isDarkMode}
        />
        <SpritesTableOther
          pokeData={pokeData}
          getPokeName={getPokeName}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
        <SpritesTableVersions
          pokeData={pokeData}
          getPokeName={getPokeName}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      </div>
      ;
    </>
  );
};

export default SpritesTable;

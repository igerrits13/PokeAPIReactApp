import React from "react";
import SpriteTableImage from "./SpriteTableImage";

// Sction to display the Pokémon's basic sprites
const SpritesTableBasic = ({ pokeData, getPokeName, isDarkMode }) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";

  // Mapping for basic Pokémon sprites
  const basicSpritesMapping = [
    { iconsStyle: "front_default", description: "Front Default" },
    { iconsStyle: "back_default", description: "Back Default" },
    { iconsStyle: "front_shiny", description: "Front Shiny" },
    { iconsStyle: "back_shiny", description: "Back Shiny" },
    { iconsStyle: "front_female", description: "Front Female" },
    { iconsStyle: "back_female", description: "Back Female" },
    { iconsStyle: "front_shiny_female", description: "Front Female Shiny" },
    { iconsStyle: "back_shiny_female", description: "Back Female Shiny" },
  ];

  // Create the HTML for the basic Pokémon sprites
  const getBasicIcons = () => {
    const basicIconsHTML = basicSpritesMapping
      .map(({ iconsStyle, description }) => {
        // Do not display sprite if URL does not exist
        const spriteUrl = pokeData.sprites[iconsStyle];
        if (!spriteUrl) return null;

        return (
          <React.Fragment key={spriteUrl}>
            <SpriteTableImage
              pokeData={pokeData}
              getPokeName={getPokeName}
              spriteUrl={spriteUrl}
              description={description}
            />
          </React.Fragment>
          // <div className="spritestab-item" key={spriteUrl}>
          //   <img
          //     src={spriteUrl}
          //     alt={getPokeName(pokeData.name)}
          //     className="sprites-table-img"
          //   />
          //   {description}
          // </div>
        );
      })
      .filter(Boolean);

    return (
      <div className={`sprites-table-game ${spriteSectionStyle} ${fontStyle}`}>
        <div>Basic Sprites</div>
        <div className="spritestab-icon-container">{basicIconsHTML}</div>
      </div>
    );
  };

  // Render the basic icons section
  return <>{getBasicIcons()}</>;
};

export default SpritesTableBasic;

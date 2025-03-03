import React from "react";
import SpriteTableImage from "./SpriteTableImage";
import SpriteTableSection from "./SpriteTableSection";

// Sction to display the Pokémon's basic sprites
const SpritesTableBasic = ({
  pokeData,
  getPokeName,
  whosThatPokemon,
  isExpanded,
  setIsExpanded,
  isDarkMode,
}) => {
  // Setup the sprites section style based on if the user is using light or dark mode
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
              whosThatPokemon={whosThatPokemon}
              spriteUrl={spriteUrl}
              description={description}
            />
          </React.Fragment>
        );
      })
      .filter(Boolean);

    return (
      <SpriteTableSection
        sectionDescription={"Basic Sprites"}
        sectionHTML={basicIconsHTML}
        index={0}
        totalIndices={0}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isDarkMode={isDarkMode}
      />
    );
  };

  // Render the basic icons section
  return <div>{getBasicIcons()}</div>;
};

export default SpritesTableBasic;

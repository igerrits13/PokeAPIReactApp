import React from "react";

// Sction to display the Pokémon's other sprites
const SpritesTableOther = ({
  pokeData,
  getPokeName,
  screenSize,
  isDarkMode,
}) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";
  const tirtiaryHeaderStyle =
    screenSize === "small"
      ? "tirtiary-page-header-small"
      : screenSize === "medium"
      ? "tirtiary-page-header-med"
      : screenSize === "large"
      ? "tirtiary-page-header-large"
      : "tirtiary-page-header-x-large";

  // Capitalize the first word of each part of the pokémon's name
  const getCategoryName = (name) => {
    const formattedName = name.split(/[-_]/).map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Check to see if an object has any values that are not null
  function hasNonNullValues(obj) {
    for (const key in obj) {
      if (obj[key] !== null) {
        return true;
      }
    }
    return false;
  }

  // Mapping for other Pokémon sprites
  const otherSpritesMapping = [
    { iconsStyle: "front_default", description: "Front Default" },
    { iconsStyle: "back_default", description: "Back Default" },
    { iconsStyle: "front_shiny", description: "Front Shiny" },
    { iconsStyle: "back_shiny", description: "Back Shiny" },
    { iconsStyle: "front_female", description: "Front Female" },
    { iconsStyle: "back_female", description: "Back Female" },
    { iconsStyle: "front_shiny_female", description: "Front Female Shiny" },
    { iconsStyle: "back_shiny_female", description: "Back Female Shiny" },
  ];

  // Create the HTML for the other Pokémon sprites
  const getOtherIcons = (category) => {
    const otherIconsHTML = otherSpritesMapping
      .map(({ iconsStyle, description }) => {
        // Do not display sprite if URL does not exist
        const spriteUrl = category[1][iconsStyle];
        if (!spriteUrl) return null;

        return (
          <div className="spritestab-item" key={spriteUrl}>
            <img
              src={spriteUrl}
              alt={getPokeName(pokeData.name)}
              className="sprites-table-img"
            />
            {description}
          </div>
        );
      })
      .filter(Boolean);

    return (
      <div className={`sprites-table-game ${spriteSectionStyle} ${fontStyle}`}>
        <div>{getCategoryName(category[0])}</div>
        <div className="spritestab-icon-container">{otherIconsHTML}</div>
      </div>
    );
  };

  // Create the HTML for the Pokémon's "other" icons
  const otherIconsHTML = Object.entries(pokeData.sprites.other).map(
    (category) => {
      // Check if current category has sprites
      const hasSprites = Object.entries(category).some(
        ([name, { front_default }]) => front_default
      );

      // If the current generation does not have sprites, do not create a section for the current gen
      if (!hasSprites) return null;

      return (
        <React.Fragment key={category}>
          {getOtherIcons(category)}
        </React.Fragment>
      );
    }
  );

  // Display the other icons of the current Pokémon
  return (
    <>
      {hasNonNullValues(otherIconsHTML) && (
        <div className={`${fontStyle} ${tirtiaryHeaderStyle}`}>
          Other {getPokeName(pokeData.name)} Sprites
        </div>
      )}
      {otherIconsHTML}
    </>
  );
};

export default SpritesTableOther;

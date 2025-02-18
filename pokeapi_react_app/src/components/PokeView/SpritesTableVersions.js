import React from "react";

// Versions section of the Pokéview sprites
const SpritesTableVersions = ({
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

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  // Dictionary holding unique game titles that are strangely formatted
  const gameTitleDictionary = {
    "firered-leafgreen": "Fire Red / Leaf Green",
    xd: "XD",
    "heartgold-soulsilver": "Heart Gold / Soul Silver",
    "black-2-white-2": "Black 2 / White 2",
    "omegaruby-alphasapphire": "Omega Ruby / Alpha Sapphire",
    "omega-ruby-alpha-sapphire": "Omega Ruby / Alpha Sapphire",
    "lets-go-pikachu-lets-go-eevee": "Let's Go Pikachu / Let's Go Eevee",
    "ultra-sun-ultra-moon": "Ultra Sun / Ultra Moon",
    "brilliant-diamond-and-shining-pearl": "Brilliant Diamond / Shining Pearl",
    "legends-arceus": "Legends Arceus",
  };

  // Return the name of the current game in formatted form
  const getGameTitle = (game) => {
    return (
      gameTitleDictionary[game] ||
      game
        .split("-")
        .map(
          (currWord) =>
            currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase()
        )
        .join(" / ")
    );
  };

  // Roman numeral to integer conversion function
  function romanToInt(roman) {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
    };

    let result = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = romanNumerals[roman[i]];

      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }

      prevValue = currentValue;
    }

    return result;
  }

  // Check to see if an object has any values that are not null
  function hasNonNullValues(obj) {
    for (const key in obj) {
      if (obj[key] !== null) {
        return true;
      }
    }
    return false;
  }

  // Mapping for version Pokémon sprites
  const versionsSpritesMapping = [
    { iconsStyle: "front_default", description: "Front Default" },
    { iconsStyle: "back_default", description: "Back Default" },
    { iconsStyle: "front_shiny", description: "Front Shiny" },
    { iconsStyle: "back_shiny", description: "Back Shiny" },
    { iconsStyle: "front_female", description: "Front Female" },
    { iconsStyle: "back_female", description: "Back Female" },
    { iconsStyle: "front_shiny_female", description: "Front Female Shiny" },
    { iconsStyle: "back_shiny_female", description: "Back Female Shiny" },
    { iconsStyle: "front_gray", description: "Front Gray" },
    { iconsStyle: "back_gray", description: "Back Gray" },
    { iconsStyle: "front_transparent", description: "Front Transparent" },
    { iconsStyle: "back_transparent", description: "Back Transparent" },
    {
      iconsStyle: "front_shiny_transparent",
      description: "Front Shiny Transparent",
    },
    {
      iconsStyle: "back_shiny_transparent",
      description: "Back Shiny Transparent",
    },
  ];

  // Create the HTML for the version Pokémon sprites
  const getVersionIcons = (gameIcons, game, isAnimated) => {
    const versionIconsHTML = versionsSpritesMapping
      .map(({ iconsStyle, description }) => {
        // Make sure the current game has the current icon style
        if (!gameIcons.hasOwnProperty(iconsStyle)) return null;

        // Do not display sprite if URL does not exist
        const spriteUrl = gameIcons[iconsStyle];
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
        <div>
          {getGameTitle(game)} {isAnimated && " - Animated"}
        </div>
        <div className="spritestab-icon-container">{versionIconsHTML}</div>
      </div>
    );
  };

  // Make sure the version sprites are sorted in order, then create the HTML for them
  const versionIconsHTML =
    pokeData.sprites.versions &&
    Object.entries(pokeData.sprites.versions)
      // Sort the generations based on Roman numeral value
      .sort(([generationA], [generationB]) => {
        const genTitleA = getGenerationTitle(generationA).split(" ")[1];
        const genTitleB = getGenerationTitle(generationB).split(" ")[1];
        const romanA = romanToInt(genTitleA);
        const romanB = romanToInt(genTitleB);

        return romanA - romanB;
      })
      .map(([generation, generationData]) => {
        if (typeof generationData !== "object") return null;

        const genTitle = getGenerationTitle(generation);

        // Check if current generation has sprites
        const hasSprites = Object.entries(generationData).some(
          ([game, { front_default }]) => front_default
        );

        // If the current generation does not have sprites, do not create a section for the current gen
        if (!hasSprites) return null;

        return (
          <React.Fragment key={genTitle}>
            <div className={`${fontStyle}`}>{genTitle}</div>
            {Object.entries(generationData)
              // Sort the sprites alphabetically by game title
              .sort(([gameA], [gameB]) => {
                const gameTitleA = getGameTitle(gameA);
                const gameTitleB = getGameTitle(gameB);
                return gameTitleA.localeCompare(gameTitleB);
              })
              .map(([game, { front_default }]) => {
                if (!front_default) return null;
                return (
                  <React.Fragment key={game}>
                    {"animated" in generationData[game] &&
                      hasNonNullValues(generationData[game].animated) &&
                      getVersionIcons(
                        generationData[game].animated,
                        game,
                        true
                      )}
                    {getVersionIcons(generationData[game], game, false)}
                  </React.Fragment>
                );
              })}
          </React.Fragment>
        );
      });

  // Render the versions icons section
  return (
    <>
      {hasNonNullValues(versionIconsHTML) && (
        <div className={`${fontStyle} ${tirtiaryHeaderStyle}`}>
          {getPokeName(pokeData.name)} Sprites by Generation
        </div>
      )}
      {versionIconsHTML}
    </>
  );
};

export default SpritesTableVersions;

import React from "react";

// Versions section of the Pokéview sprites
const SpritesTableVersions = ({ pokeData, getPokeName, isDarkMode }) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";

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

  // Capitalize the first word of each part of the pokémon's name
  const getIconName = (name) => {
    const formattedName = name.split("_").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
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

  // Display the icons for the current game
  const getGameIcons = (gameIcons, game) => {
    const gameIconsHTML = (
      <>
        {/* Render the game section for animated sprites if they exist */}
        {"animated" in gameIcons && hasNonNullValues(gameIcons.animated) && (
          <div
            className={`sprites-table-game ${spriteSectionStyle} ${fontStyle}`}
          >
            <div>{getGameTitle(game)} - Animations</div>
            <div className="spritestab-icon-container">
              {Object.entries(gameIcons["animated"]).map((icon) => {
                return (
                  icon[1] && (
                    <div className="spritestab-item" key={icon[0]}>
                      <img
                        src={icon[1]}
                        alt={getPokeName(pokeData.name)}
                        className="sprites-table-img"
                      />
                      {getIconName(icon[0])}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}

        {/* Render the game section for normal sprites */}
        <div
          className={`sprites-table-game ${spriteSectionStyle} ${fontStyle}`}
        >
          <div>{getGameTitle(game)}</div>
          <div className="spritestab-icon-container">
            {Object.entries(gameIcons).map((icon) => {
              return (
                icon[0] !== "animated" &&
                icon[1] && (
                  <div className="spritestab-item" key={icon[0]}>
                    <img
                      src={icon[1]}
                      alt={getPokeName(pokeData.name)}
                      className="sprites-table-img"
                    />
                    {getIconName(icon[0])}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </>
    );
    return gameIconsHTML;
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
                    {getGameIcons(generationData[game], game)}
                  </React.Fragment>
                );
              })}
          </React.Fragment>
        );
      });

  // Render the versions icons section
  return <>{versionIconsHTML}</>;
};

export default SpritesTableVersions;

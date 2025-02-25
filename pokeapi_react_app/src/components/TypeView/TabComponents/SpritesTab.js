import React, { useState } from "react";
import CollapseExpandButton from "../../CommonComponents/CollapseExpandButton";
import SpriteTableImage from "../../PokeView/SpritesTableComponents/SpriteTableImage";
import SpriteTableSection from "../../PokeView/SpritesTableComponents/SpriteTableSection";

// Tab displaying a list of sprites
const SpritesTab = ({ typeData, isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  // State to keep track if the user has selected to expand or collapse all sections of table
  // Null if the user has not selected anything
  const [isExpanded, setIsExpanded] = useState(null);

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

  // Capitalize the first letter of the current type
  const getTypeName = (name) => {
    return name[0].toUpperCase() + name.slice(1);
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

  // Get the current index of the generation to be displayed
  let currIndex = 0;

  // Get the total number of generations that will be displayed
  const numGens = Object.entries(typeData.sprites || {}).reduce(
    (total, [generation, generationData]) => {
      if (typeof generationData !== "object") return total;

      // Check if current generation has sprites
      const hasSprites = Object.entries(generationData).some(
        ([game, { name_icon }]) => name_icon
      );

      // If the current generation has sprites, increment the total
      if (hasSprites) {
        return total + 1;
      }

      return total;
    },
    0
  );

  // Create the HTML for the version Pokémon sprites
  const getGameIcons = (genTitle, gameIcons, i) => {
    const gameIconsHTML = Object.entries(gameIcons)
      .map(([currGame, iconURL]) => {
        return (
          <React.Fragment key={currGame}>
            <SpriteTableImage
              pokeData={typeData}
              getPokeName={getTypeName}
              spriteUrl={iconURL.name_icon}
              description={getGameTitle(currGame)}
            />
          </React.Fragment>
        );
      })
      .filter(Boolean);

    return (
      <SpriteTableSection
        spritePage={"types"}
        sectionDescription={`${genTitle}`}
        sectionHTML={gameIconsHTML}
        index={currIndex++}
        totalIndices={numGens - 1}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isDarkMode={isDarkMode}
      />
    );
  };

  // Display for the sprites tab information
  const spritesHTML =
    typeData.sprites &&
    Object.entries(typeData.sprites)
      // Sort the generations based on Roman numeral value
      .sort(([generationA], [generationB]) => {
        const genTitleA = getGenerationTitle(generationA).split(" ")[1];
        const genTitleB = getGenerationTitle(generationB).split(" ")[1];
        const romanA = romanToInt(genTitleA);
        const romanB = romanToInt(genTitleB);

        return romanA - romanB;
      })
      .map(([generation, generationData], i) => {
        if (typeof generationData !== "object") return null;

        const genTitle = getGenerationTitle(generation);

        // Check if current generation has sprites
        const hasSprites = Object.entries(generationData).some(
          ([game, { name_icon }]) => name_icon
        );

        // If the current generation does not have sprites, do not create a section for the current gen
        if (!hasSprites) return null;

        return (
          <React.Fragment key={generation}>
            {getGameIcons(genTitle, generationData, i)}
          </React.Fragment>
        );
      });

  // Display the full sprites tab
  return (
    <div className="spritestab-container">
      <div className={`sprites-table-label sub-header ${fontStyle}`}>
        {getTypeName(typeData.name)} Sprites
        <CollapseExpandButton
          setIsExpanded={setIsExpanded}
          isDarkMode={isDarkMode}
        />
      </div>
      <div>{spritesHTML}</div>
    </div>
  );
};

export default SpritesTab;

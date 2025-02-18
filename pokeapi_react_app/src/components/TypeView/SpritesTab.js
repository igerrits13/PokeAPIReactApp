// Tab displaying a list of sprites
const SpritesTab = ({ typeData, isDarkMode }) => {
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
          <div
            key={i}
            className={`spritestab-generation ${spriteSectionStyle} ${fontStyle}`}
          >
            <div>{genTitle}</div>
            <div className="spritestab-icon-container">
              {Object.entries(generationData)
                // Sort the sprites alphabetically by game title
                .sort(([gameA], [gameB]) => {
                  const gameTitleA = getGameTitle(gameA);
                  const gameTitleB = getGameTitle(gameB);
                  return gameTitleA.localeCompare(gameTitleB);
                })
                .map(([game, { name_icon }], i) => {
                  if (!name_icon) return null;

                  const gameTitle = getGameTitle(game);
                  return (
                    <div key={i} className="spritestab-item">
                      <img
                        src={name_icon}
                        alt={generation}
                        className="spritestab-img"
                      />
                      {gameTitle}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      });

  // Display the full sprites tab
  return <div className="spritestab-container">{spritesHTML}</div>;
};

export default SpritesTab;

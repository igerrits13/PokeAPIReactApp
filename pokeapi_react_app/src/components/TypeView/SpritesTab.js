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
    "lets-go-pikachu-lets-go-eevee": "Lets go Pikachu / Lets go Eevee",
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

  // Display for the sprites tab information
  const spritesHTML =
    typeData.sprites && typeof typeData.sprites === "object"
      ? Object.entries(typeData.sprites).map(
          ([generation, generationData], i) => {
            if (typeof generationData !== "object") return null;

            const genTitle = getGenerationTitle(generation);

            return (
              <div
                key={i}
                className={`spritestab-generation ${spriteSectionStyle} ${fontStyle}`}
              >
                <div>{genTitle}</div>
                <div className="spritestab-icon-container">
                  {Object.entries(generationData).map(
                    ([game, { name_icon }], i) => {
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
                    }
                  )}
                </div>
              </div>
            );
          }
        )
      : null;

  // Display the full sprites tab
  return <div className="spritestab-container">{spritesHTML}</div>;
};

export default SpritesTab;

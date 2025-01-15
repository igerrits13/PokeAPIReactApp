// Tab displaying a list of sprites
const SpritesTab = ({ typeData, isDarkMode }) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";

  // Display sprites tab when active
  const spritesHTML =
    typeData.sprites && typeof typeData.sprites === "object" ? (
      Object.keys(typeData.sprites).map((generation, i) => {
        const generationData = typeData.sprites[generation];
        // Seperate the generation title by '-' and capitalize appropriate letters
        let genTitle = generation.split("-");
        genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
        genTitle[1] = genTitle[1].toUpperCase();
        return generationData && typeof generationData === "object" ? (
          <div
            key={i}
            className={`spritestab-generation ${spriteSectionStyle}  ${fontStyle}`}
          >
            <div>{genTitle.join(" ")}</div>
            <div className="spritestab-icon-container">
              {Object.keys(generationData).map((game, i) => {
                const spriteUrl = generationData[game]?.name_icon;
                // Seperate the game title by '-', replacing with a '/', and capitalize appropriate letters
                let gameTitle = game.split("-");
                gameTitle[0] =
                  gameTitle[0][0].toUpperCase() + gameTitle[0].slice(1);
                if (gameTitle[1]) {
                  gameTitle[1] =
                    gameTitle[1][0].toUpperCase() + gameTitle[1].slice(1);
                }
                if (spriteUrl) {
                  return (
                    <div key={i} className="spritestab-item">
                      <img
                        src={spriteUrl}
                        alt={generation}
                        className="spritestab-img"
                      />
                      {gameTitle.join("/")}
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        ) : (
          <></>
        );
      })
    ) : (
      <></>
    );

  return <div className="spritestab-container">{spritesHTML}</div>;
};

export default SpritesTab;

// Diplay to show the current Pokémon's gifs and status bars
const BattleDisplayImages = ({
  pokeData,
  pokeSpeciesData,
  whosThatPokemon,
  level,
  isNormalToggle,
  screenSize,
}) => {
  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Get the current Pokémon's HP
  const hpBaseText = pokeData.stats.find(
    (obj) => obj.stat.name === "hp"
  )?.base_stat;

  const hpText = whosThatPokemon ? "??" : hpBaseText;

  // Display the front and back gifs and status bars
  return (
    <div className="battle-display-field">
      <div className="battle-display-field-pokemon-platform battle-display-field-pokemon-platform-front">
        <div className="battle-display-field-pokemon-platform-ring"></div>
      </div>
      <div
        className={`battle-display-field-pokemon-back-container ${
          screenSize === "small"
            ? "battle-display-field-pokemon-back-container-small"
            : "battle-display-field-pokemon-back-container-large"
        }`}
      >
        <img
          className={`battle-display-field-pokemon-back ${
            whosThatPokemon ? "pokeview-image-dark" : ""
          }`}
          src={
            isNormalToggle
              ? pokeData.sprites.other.showdown.back_default
              : pokeData.sprites.other.showdown.back_shiny
          }
          alt={`${pokeData.name} gif`}
        />
      </div>
      <div className="battle-display-field-statusbar-front">
        <div className="battle-display-field-statusbar-front-name font-light-pixel">
          <span>
            {whosThatPokemon ? "????" : getPokeName(pokeSpeciesData.name)}
          </span>
          <span>Lv. {whosThatPokemon ? "??" : level}</span>
        </div>
        <div className="battle-display-field-statusbar-front-hp-container">
          HP
          <div
            className={`battle-display-field-statusbar-front-hp-bar ${
              screenSize === "small"
                ? "battle-display-field-statusbar-front-hp-bar-small"
                : "battle-display-field-statusbar-front-hp-bar-large"
            }`}
          ></div>
        </div>
      </div>
      <div className="battle-display-field-pokemon-platform battle-display-field-pokemon-platform-back">
        <div className="battle-display-field-pokemon-platform-ring"></div>
      </div>
      <div
        className={`battle-display-field-pokemon-front-container ${
          screenSize === "small"
            ? "battle-display-field-pokemon-front-container-small"
            : "battle-display-field-pokemon-front-container-large"
        }`}
      >
        <img
          className={`battle-display-field-pokemon-front ${
            whosThatPokemon ? "pokeview-image-dark" : ""
          }`}
          src={
            isNormalToggle
              ? pokeData.sprites.other.showdown.front_default
              : pokeData.sprites.other.showdown.front_shiny
          }
          alt={`${pokeData.name} gif`}
        />
      </div>
      <div className="battle-display-field-statusbar-back">
        <div className="battle-display-field-statusbar-back-name font-light-pixel">
          <span>
            {whosThatPokemon ? "????" : getPokeName(pokeSpeciesData.name)}
          </span>
          <span>Lv. {whosThatPokemon ? "??" : level}</span>
        </div>
        <div className="battle-display-field-statusbar-back-hp-container">
          HP
          <div
            className={`battle-display-field-statusbar-back-hp-bar ${
              screenSize === "small"
                ? "battle-display-field-statusbar-back-hp-bar-small"
                : "battle-display-field-statusbar-back-hp-bar-large"
            }`}
          ></div>
        </div>
        <div className="battle-display-field-statusbar-back-hp-number font-light-pixel">
          {hpText} / {hpText}
        </div>
      </div>
      <div className="battle-display-field-statusbar-back-detail"></div>
    </div>
  );
};

export default BattleDisplayImages;

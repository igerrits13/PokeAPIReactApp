import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import Footer from "../CommonComponents/Footer";

const NotFoundView = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "notfound-small"
      : screenSize === "medium"
      ? "notfound-med"
      : "notfound-large";

  // Get a random Pokémon number to display
  const randPokemonNum = Math.floor(Math.random() * fullPokeResults.length) + 1;
  // Decide if it will be shiny or not
  const randShiny = Math.floor(Math.random() * 2) + 1;

  // Get the random Pokémon image
  let randPokemon;
  if (randShiny === 1) {
    randPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randPokemonNum}.png`;
  } else {
    randPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${randPokemonNum}.png`;
  }

  // Display the page not found view components
  return (
    <div
      className={`notfound-container ${containerSize} ${fontStyle} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <img
        className="notfound-image"
        src={`${randPokemon}`}
        alt={`Pokémon`}
        style={{ display: fullPokeResults.length !== 0 ? "block" : "none" }}
      />
      <div className="notfound-text">
        Oh no! It looks like this page does not exist!
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default NotFoundView;

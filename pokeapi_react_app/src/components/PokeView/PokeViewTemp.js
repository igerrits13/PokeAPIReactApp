import { useParams, useNavigate } from "react-router-dom";
import SecondaryViewHeader from "../CommonComponents/SecondaryViewHeader";
import Footer from "../CommonComponents/Footer";

// Temporary page while Pokémon page is not done
const PokeViewTemp = ({ fullPokeResults, screenSize, isDarkMode }) => {
  // Setup data structures to store the id of the Pokémon search, and for navigation to other pages
  const { id } = useParams();
  const navigate = useNavigate();
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Set what the container size for the page should be based on viewport width
  const containerSize =
    screenSize === "small"
      ? "notfound-small"
      : screenSize === "medium"
      ? "notfound-med"
      : "notfound-large";

  // If the Pokémon searched for is not a valid ID, redirect to page not found
  if (
    (fullPokeResults.length > 0 && (id < 0 || id > fullPokeResults.length)) ||
    isNaN(id)
  ) {
    navigate("/notfound");
    return;
  }

  // Decide if image will be shiny or not
  const randShiny = Math.floor(Math.random() * 2) + 1;

  // Get image of the currently selected Pokémon, shiny or regular version
  let randPokemon;
  if (randShiny === 1) {
    randPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  } else {
    randPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  }

  // Display the temporary Pokémon page
  return (
    <div
      className={`notfound-container ${containerSize} ${
        isDarkMode ? "background-dark" : "background-light"
      }`}
    >
      <SecondaryViewHeader
        fullPokeResults={fullPokeResults}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
      <div className="notfound-image-text">
        <img
          className="notfound-image"
          src={`${randPokemon}`}
          alt={`Pokémon`}
          style={{ display: fullPokeResults.length !== 0 ? "block" : "none" }}
        />
        <div className={`${fontStyle}`}>
          Sorry for the mess! This page is still under construction.
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PokeViewTemp;

import NavButtonPrev from "./NavButtonPrev";
import NavButtonNext from "./NavButtonNext";

// Container to hold the navigation buttons
const NavButtons = ({
  id,
  fullPokeResults,
  whosThatPokemon,
  screenSize,
  isDarkMode,
}) => {
  return (
    <div
      className={`nav-button-container ${
        screenSize === "small" ? "nav-button-container-small" : ""
      }`}
    >
      <NavButtonPrev
        id={Number(id) - 1}
        fullPokeResults={fullPokeResults}
        whosThatPokemon={whosThatPokemon}
        isDarkMode={isDarkMode}
      />
      <NavButtonNext
        id={Number(id) + 1}
        fullPokeResults={fullPokeResults}
        whosThatPokemon={whosThatPokemon}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default NavButtons;

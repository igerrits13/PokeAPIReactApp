import PokeBasicInfo from "./PokeBasicInfo";
import PokeImage from "./PokeImage";

// Pokémon information and image
const PokeInfoTable = ({
  pokeData,
  pokeSpeciesData,
  isDarkMode,
  screenSize,
}) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Display for the Pokémon information and image
  return (
    <div
      className={`${
        screenSize === "small" || screenSize === "medium"
          ? "secondary-grid-row-small-med"
          : "secondary-grid-row-large"
      } ${fontStyle}`}
    >
      {screenSize === "small" || screenSize === "medium" ? (
        <>
          <PokeImage pokeData={pokeData} isDarkMode={isDarkMode} />
          <PokeBasicInfo
            pokeData={pokeData}
            pokeSpeciesData={pokeSpeciesData}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
        </>
      ) : (
        <>
          <PokeBasicInfo
            pokeData={pokeData}
            pokeSpeciesData={pokeSpeciesData}
            screenSize={screenSize}
            isDarkMode={isDarkMode}
          />
          <PokeImage pokeData={pokeData} isDarkMode={isDarkMode} />
        </>
      )}
    </div>
  );
};

export default PokeInfoTable;

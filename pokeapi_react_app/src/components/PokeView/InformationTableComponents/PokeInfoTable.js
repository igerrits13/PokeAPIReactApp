import PokeBasicInfo from "./PokeBasicInfo";
import PokeImage from "./PokeImage";
import BreedingInfo from "./BreedingInfo";
import TrainingInfo from "./TrainingInfo";
import FormsInfo from "./FormsInfo";

// Pokémon information and image
const PokeInfoTable = ({
  setPokeId,
  pokeData,
  pokeSpeciesData,
  babyTriggerItem,
  isDarkMode,
  screenSize,
}) => {
  // Setup the font style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Display the current Pokémon information and image
  return (
    <div
      className={`${
        screenSize === "small" || screenSize === "medium"
          ? "secondary-grid-row-small-med"
          : "secondary-grid-row-large"
      } ${fontStyle}`}
    >
      {/* Display the Pokémon image and basic information vertically on small screens, otherwise horizontally */}
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
      {/* Display the next, in depth Pokémon information sections in a way that fits with enough room to fully show on screensize */}
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "secondary-grid-row-small-med"
            : "secondary-grid-row-large"
        } ${fontStyle}`}
      >
        <hr />
        <BreedingInfo
          pokeSpeciesData={pokeSpeciesData}
          babyTriggerItem={babyTriggerItem}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
        <TrainingInfo
          pokeData={pokeData}
          pokeSpeciesData={pokeSpeciesData}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
        <FormsInfo
          pokeData={pokeData}
          setPokeId={setPokeId}
          pokeSpeciesData={pokeSpeciesData}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default PokeInfoTable;

import { useState } from "react";
import BattleDisplayImages from "./BattleDisplayImages";
import BattleDisplayInfo from "./BattleDisplayInfo";
import BattleDisplayAttack from "./BattleDisplayAttack";
import BattleDisplayBag from "./BattleDisplayBag";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

// Overall battle display and components
const BattleDisplay = ({
  pokeData,
  pokeSpeciesData,
  isNormalToggle,
  whosThatPokemon,
  level,
  screenSize,
  callCount,
  setCallCount,
}) => {
  // Store data to keep track of what section should currently be displayed
  const [mainSection, setMainSection] = useState(true);
  const [fightSection, setFightSection] = useState(false);
  const [pokeSection, setPokeSection] = useState(false);
  const [bagSection, setBagSection] = useState(false);
  const [runSection, setRunSection] = useState(false);

  // Get the first English flavor text for the current Pokémon
  const flavorText = pokeSpeciesData.flavor_text_entries
    .find((obj) => obj.language.name === "en")
    ?.flavor_text.replace("\u000c", " ");

  const pokeText = whosThatPokemon ? "????" : flavorText;

  // Display the components that makeup the overall battle display
  return (
    <div
      className={`battle-display-container ${
        screenSize === "small"
          ? "battle-display-info-small"
          : screenSize === "med"
          ? "battle-display-info-med"
          : "battle-display-info-large"
      }`}
    >
      <BattleDisplayImages
        pokeData={pokeData}
        pokeSpeciesData={pokeSpeciesData}
        whosThatPokemon={whosThatPokemon}
        level={level}
        isNormalToggle={isNormalToggle}
        screenSize={screenSize}
      />
      {mainSection && (
        <BattleDisplayInfo
          pokeSpeciesData={pokeSpeciesData}
          whosThatPokemon={whosThatPokemon}
          setMainSection={setMainSection}
          setFightSection={setFightSection}
          setPokeSection={setPokeSection}
          setBagSection={setBagSection}
          setRunSection={setRunSection}
        />
      )}
      {fightSection && (
        <BattleDisplayAttack
          pokeData={pokeData}
          setMainSection={setMainSection}
          setSection={setFightSection}
          whosThatPokemon={whosThatPokemon}
          callCount={callCount}
          setCallCount={setCallCount}
        />
      )}
      {pokeSection && (
        <BattleDisplayTextbox
          setMainSection={setMainSection}
          setSection={setPokeSection}
          inputText={pokeText}
          whosThatPokemon={whosThatPokemon}
        />
      )}
      {bagSection &&
        (pokeData.held_items.length === 0 ? (
          <BattleDisplayTextbox
            setMainSection={setMainSection}
            setSection={setBagSection}
            inputText={
              whosThatPokemon ? "????" : "This Pokémon has no held items!"
            }
            whosThatPokemon={whosThatPokemon}
          />
        ) : (
          <BattleDisplayBag
            pokeData={pokeData}
            setMainSection={setMainSection}
            setSection={setBagSection}
            whosThatPokemon={whosThatPokemon}
            callCount={callCount}
            setCallCount={setCallCount}
          />
        ))}
      {runSection && (
        <BattleDisplayTextbox
          setMainSection={setMainSection}
          setSection={setRunSection}
          inputText={"You couldn't get away!"}
        />
      )}
    </div>
  );
};

export default BattleDisplay;

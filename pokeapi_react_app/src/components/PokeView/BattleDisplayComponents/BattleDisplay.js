import { useState } from "react";
import BattleDisplayInfo from "./BattleDisplayInfo";
import BattleDisplayAttack from "./BattleDisplayAttack";
import BattleDisplayBag from "./BattleDisplayBag";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

const BattleDisplay = ({
  pokeData,
  pokeSpeciesData,
  isNormalToggle,
  whosThatPokemon,
  screenSize,
}) => {
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
      {/*  */}
      <div className="battle-display-field">
        <div className="battle-display-field-pokemon-platform battle-display-field-pokemon-platform-front">
          <div className="battle-display-field-pokemon-platform-ring"></div>
        </div>
        <div className="battle-display-field-pokemon-back-container">
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
        <div className="battle-display-field-pokemon-platform battle-display-field-pokemon-platform-back">
          <div className="battle-display-field-pokemon-platform-ring"></div>
        </div>
        <div className="battle-display-field-pokemon-front-container">
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
      </div>
      {/*  */}
      {/* Field for the pokemon to battle, display for Pokemon options */}
      {mainSection && (
        <BattleDisplayInfo
          pokeData={pokeData}
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

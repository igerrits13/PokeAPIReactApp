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
  level,
  screenSize,
}) => {
  const [mainSection, setMainSection] = useState(true);
  const [fightSection, setFightSection] = useState(false);
  const [pokeSection, setPokeSection] = useState(false);
  const [bagSection, setBagSection] = useState(false);
  const [runSection, setRunSection] = useState(false);

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Get the first English flavor text for the current Pokémon
  const hpBaseText = pokeData.stats.find(
    (obj) => obj.stat.name === "hp"
  )?.base_stat;

  const hpText = whosThatPokemon ? "??" : hpBaseText;

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
      {/*  */}
      {/* Field for the pokemon to battle, display for Pokemon options */}
      {mainSection && (
        <BattleDisplayInfo
          pokeData={pokeData}
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

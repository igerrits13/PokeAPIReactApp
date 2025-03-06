import { useState } from "react";
import BattleDisplayInfo from "./BattleDisplayInfo";
import BattleDisplayAttack from "./BattleDisplayAttack";
import BattleDisplayBag from "./BattleDisplayBag";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

const BattleDisplay = ({ pokeData, pokeSpeciesData, whosThatPokemon }) => {
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
    <div className="battle-display-container">
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
        />
      )}
      {pokeSection && (
        <BattleDisplayTextbox
          setMainSection={setMainSection}
          setSection={setPokeSection}
          inputText={pokeText}
        />
      )}
      {bagSection &&
        (pokeData.held_items.length === 0 ? (
          <BattleDisplayTextbox
            setMainSection={setMainSection}
            setSection={setBagSection}
            inputText={"This Pokémon has no held items!"}
          />
        ) : (
          <BattleDisplayBag
            pokeData={pokeData}
            setMainSection={setMainSection}
            setSection={setBagSection}
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

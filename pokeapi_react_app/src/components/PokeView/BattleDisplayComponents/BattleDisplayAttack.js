import { useState } from "react";
import { motion } from "motion/react";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

// Buttons for information on abilites the current Pokémon has
const BattleDisplayAttack = ({
  pokeData,
  setMainSection,
  setSection,
  whosThatPokemon,
  callCount,
  setCallCount,
}) => {
  // State to store the flavor text for the current ability
  const [flavorText, setFlavorText] = useState(null);

  // Capitalize the first word of each part of the Pokémon's name
  const getMoveName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Fetch the information to be displayed for the selected ability
  const handleButtonClick = async (url) => {
    if (whosThatPokemon) {
      setFlavorText("????");
      return;
    }
    setCallCount(callCount + 1);
    console.log("Fetching Pokémon attack data: ", callCount);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const flavorText = data.effect_entries
        .find((obj) => obj.language.name === "en")
        ?.effect.replace("\u000c", " ");
      setFlavorText(flavorText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Buttons to be displayed for each ability that the Pokémon can learn
  const buttonHTML = pokeData.abilities.map((item, i) => {
    return (
      <motion.button
        key={i}
        className="battle-display-info-button battle-display-info-button-default font-dark-pixel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        onClick={() => handleButtonClick(item.ability.url)}
      >
        <div className="battle-display-info-unknown-textbox battle-display-info-button-textbox hover-dim">
          {whosThatPokemon ? "????" : getMoveName(item.ability.name)}
        </div>
      </motion.button>
    );
  });

  // Display button options for abilities
  return (
    <div className="battle-display-info battle-display-info-buttons">
      {!flavorText && buttonHTML}
      {flavorText && (
        <BattleDisplayTextbox
          setMainSection={setMainSection}
          setSection={setSection}
          inputText={flavorText}
        />
      )}
    </div>
  );
};

export default BattleDisplayAttack;

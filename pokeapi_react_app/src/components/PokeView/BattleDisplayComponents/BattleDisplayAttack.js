import { useState } from "react";
import { motion } from "motion/react";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

const BattleDisplayAttack = ({ pokeData, setMainSection, setSection }) => {
  // State to store the flavor text for BattleDisplayTextbox
  const [flavorText, setFlavorText] = useState(null);

  // Capitalize the first word of each part of the pokémon's name
  const getMoveName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Function to handle button click and make API call
  const handleButtonClick = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Get the first English flavor text for the current Pokémon
      const flavorText = data.effect_entries
        .find((obj) => obj.language.name === "en")
        ?.effect.replace("\u000c", " ");

      // Update the flavor text state
      setFlavorText(flavorText);
      // You can update state or perform other actions here with the API response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const buttonHTML = pokeData.abilities.map((item, i) => {
    return (
      <motion.button
        key={i}
        className="battle-display-info-button battle-display-info-button-default font-dark-pixel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        onClick={() => handleButtonClick(item.ability.url)} // Trigger API call on click
      >
        <div className="battle-display-info-unknown-textbox battle-display-info-button-textbox hover-dim">
          {getMoveName(item.ability.name)}
        </div>
      </motion.button>
    );
  });

  return (
    <div className="battle-display-info battle-display-info-buttons">
      {!flavorText && buttonHTML}
      {flavorText && (
        <BattleDisplayTextbox
          setMainSection={setMainSection}
          setSection={setSection}
          inputText={flavorText} // Pass the fetched flavor text to BattleDisplayTextbox
        />
      )}
    </div>
  );
};

export default BattleDisplayAttack;

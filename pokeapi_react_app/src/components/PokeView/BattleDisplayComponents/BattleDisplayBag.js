import { useState } from "react";
import { motion } from "motion/react";
import BattleDisplayTextbox from "./BattleDisplayTextbox";

// Buttons for information on items the current Pokémon can be holding when encountered
const BattleDisplayBag = ({
  pokeData,
  setMainSection,
  setSection,
  whosThatPokemon,
  callCount,
  setCallCount,
}) => {
  // State to store the flavor text for the current item
  const [flavorText, setFlavorText] = useState(null);

  // Capitalize the first word of each part of the item
  const getItemName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Fetch the information to be displayed for the selected item
  const handleButtonClick = async (url) => {
    if (whosThatPokemon) {
      setFlavorText("????");
      return;
    }
    try {
      setCallCount(callCount + 1);
      console.log("Fetching Pokémon item data: ", callCount);
      const response = await fetch(url);
      const data = await response.json();
      const flavorText = data.flavor_text_entries
        .find((obj) => obj.language.name === "en")
        ?.text.replace("\u000c", " ");
      setFlavorText(flavorText);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Buttons to be displayed for each item that the Pokémon cound be holding
  const buttonHTML = pokeData.held_items.map(({ item }, i) => {
    return (
      <motion.button
        key={i}
        className="battle-display-info-button battle-display-info-button-default font-dark-pixel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        onClick={() => handleButtonClick(item.url)}
      >
        <div className="battle-display-info-unknown-textbox battle-display-info-button-textbox hover-dim">
          {whosThatPokemon ? "????" : getItemName(item.name)}
        </div>
      </motion.button>
    );
  });

  // Display button options for items
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

export default BattleDisplayBag;

import { motion } from "motion/react";

// Basic view for the battle view home section
const BattleDisplayInfo = ({
  pokeSpeciesData,
  whosThatPokemon,
  setMainSection,
  setFightSection,
  setPokeSection,
  setBagSection,
  setRunSection,
}) => {
  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Handle navigation for clicking on each button
  const handleOnFightClick = () => {
    setMainSection(false);
    setFightSection(true);
  };

  const handleOnPokeClick = () => {
    setMainSection(false);
    setPokeSection(true);
  };

  const handleOnBagClick = () => {
    setMainSection(false);
    setBagSection(true);
  };

  const handleOnRunClick = () => {
    setMainSection(false);
    setRunSection(true);
  };

  // Setup the text to be displayed for the basic info display
  const promptText = whosThatPokemon
    ? "????".split("")
    : `What will ${getPokeName(pokeSpeciesData.name)} do?`.split("");

  // Display the basic prompt and option buttons for the battle display
  return (
    <div className="battle-display-info battle-display-info-main">
      <div className="battle-display-info-section battle-display-info-section-prompt font-light-pixel">
        <div className="battle-display-info-textbox">
          {promptText.map((char, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 20,
              }}
              key={i}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
      {/* Buttons to be displayed */}
      <motion.button
        className="battle-display-info-button-fight battle-display-info-button font-dark-pixel"
        onClick={handleOnFightClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <div className="battle-display-info-fight-textbox battle-display-info-button-textbox hover-dim">
          FIGHT
        </div>
      </motion.button>
      <motion.button
        className="battle-display-info-button-bag battle-display-info-button battle-display-info-button-default font-dark-pixel"
        onClick={handleOnBagClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <div className="battle-display-info-bag-textbox battle-display-info-button-textbox hover-dim">
          BAG
        </div>
      </motion.button>
      <motion.button
        className="battle-display-info-button-pokemon battle-display-info-button battle-display-info-button-default font-dark-pixel"
        onClick={handleOnPokeClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <div className="battle-display-info-pokemon-textbox battle-display-info-button-textbox hover-dim">
          POKéMON
        </div>
      </motion.button>
      <motion.button
        className="battle-display-info-button-run battle-display-info-button battle-display-info-button-default font-dark-pixel"
        onClick={handleOnRunClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <div className="battle-display-info-run-textbox battle-display-info-button-textbox hover-dim">
          RUN
        </div>
      </motion.button>
    </div>
  );
};

export default BattleDisplayInfo;

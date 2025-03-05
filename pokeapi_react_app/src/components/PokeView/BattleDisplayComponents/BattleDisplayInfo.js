import { motion } from "motion/react";

const BattleDisplayInfo = ({ pokeData, whosThatPokemon }) => {
  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  const promptText = whosThatPokemon
    ? "????".split("")
    : `What will ${getPokeName(pokeData.name)} do?`.split("");

  return (
    <div className="battle-display-info">
      <div className="battle-display-info-prompt font-light-pixel">
        <div className="battle-display-info-prompt-textbox">
          {/* What will {getPokeName(pokeData.name)} do? */}
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
      <button className="battle-display-info-fight battle-display-info-item font-dark-pixel">
        <div className="battle-display-info-fight-textbox">FIGHT</div>
      </button>
      <button className="battle-display-info-bag battle-display-info-item font-dark-pixel">
        <div className="battle-display-info-bag-textbox">BAG</div>
      </button>
      <button className="battle-display-info-pokemon battle-display-info-item font-dark-pixel">
        <div className="battle-display-info-pokemon-textbox">POKéMON</div>
      </button>
      <button className="battle-display-info-run battle-display-info-item font-dark-pixel">
        <div className="battle-display-info-run-textbox">RUN</div>
      </button>
    </div>
  );
};

export default BattleDisplayInfo;

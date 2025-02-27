import { useState } from "react";
import { motion } from "motion/react";
import BattleDisplay from "../BattleDisplayComponents/BattleDisplay";
import PokeImage from "./PokeImage";

// Allow user to toggle between the battle and art Poké display
const BattleImageToggle = ({ pokeData, isDarkMode }) => {
  // State to track which view should be showing
  const [battleView, setBattleView] = useState(true);

  // Display the toggle and appropriate view
  return (
    <div className="secondary-table-conainer-50">
      {battleView ? (
        <BattleDisplay pokeData={pokeData} isDarkMode={isDarkMode} />
      ) : (
        <PokeImage pokeData={pokeData} isDarkMode={isDarkMode} />
      )}
      <div className="pokeview-toggle-container">
        Battle
        <div
          className="pokeview-toggle"
          data-battleview={battleView}
          onClick={() => setBattleView(!battleView)}
        >
          <motion.div
            className="pokeview-toggle-handle"
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
          />
        </div>
        Artwork
      </div>
    </div>
  );
};

export default BattleImageToggle;

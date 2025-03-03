import { motion } from "motion/react";

const WhosThatPokemonToggle = ({
  whosThatPokemon,
  setWhosThatPokemon,
  isDarkMode,
}) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const buttonStyle = isDarkMode
    ? "stats-progress-dark-min component-outline-dark"
    : "stats-progress-light-min component-outline-light";

  // Display the Who's that Pokémon button
  return (
    <motion.button
      className={`option-sort-dropdown-button whos-that-button ${buttonStyle}`}
      onClick={() => setWhosThatPokemon(!whosThatPokemon)}
      whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.9, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      <div className={`${fontStyle}`}>Reveal Pokémon!</div>
    </motion.button>
  );
};

export default WhosThatPokemonToggle;

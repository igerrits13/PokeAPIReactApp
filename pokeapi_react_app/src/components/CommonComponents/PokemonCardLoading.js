import { motion } from "motion/react";
import pokeBall from "../icons/poke-ball.png";

// Create loading animated card for individual Pokémon cards
const PokemonCardLoading = ({ isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const cardStyle = isDarkMode
    ? "component-background-dark"
    : "component-background-light";
  const cardTitleStyle = isDarkMode ? "font-dark" : "font-light";

  // Display a temporary loading card with spinning Pokéball
  return (
    <motion.div
      className={`pokemon-card ${cardStyle}`}
      whileHover={{ scale: 1.05, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.95, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      <div className={`pokemon-card-title ${cardTitleStyle}`}>Loading...</div>
      <motion.img
        initial={{
          rotate: "0deg",
        }}
        animate={{
          rotate: "360deg",
        }}
        transition={{
          duration: 1,
          type: "spring",
          repeat: Infinity,
          repeatDelay: 0.8,
        }}
        className="pokemon-load-image"
        src={pokeBall}
        alt={`Poké card loading`}
      />
      <div className={`pokemon-card-number ${cardTitleStyle}`}>#????</div>
    </motion.div>
  );
};

export default PokemonCardLoading;

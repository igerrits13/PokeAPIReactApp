import { motion } from "motion/react";
import pokeBall from "./icons/poke-ball.png";

// Create loading animation for individual Pokémon cards
const PokemonCardLoading = () => {
  return (
    <motion.div
      className="pokemon-card"
      whileHover={{ scale: 1.05, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.95, rotate: "10deg" }}
    >
      <div className="pokemon-card-title">Loading...</div>
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
      <div className="pokemon-card-number">#????</div>
    </motion.div>
  );
};

export default PokemonCardLoading;

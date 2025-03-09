import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import pokeBall from "../icons/poke-ball.png";

// Button that loads a random Pokémon with blank details
const WhosThatPokemon = ({
  whosThatPokemon,
  setWhosThatPokemon,
  pokeResults,
  isDarkMode,
}) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const buttonStyle = isDarkMode
    ? "stats-progress-dark-min component-outline-dark"
    : "stats-progress-light-min component-outline-light";

  // Allow for navigating to another page
  const navigate = useNavigate();

  // When clicked, set the details to blank and load a random Pokémon page
  const handleOnClick = () => {
    setWhosThatPokemon(!whosThatPokemon);
    const randPokemon = Math.floor(Math.random() * pokeResults.length);
    navigate(`/pokemon/${randPokemon + 1}`);
  };

  // Display the Who's that Pokémon button
  return (
    <motion.button
      className={`option-sort-dropdown-button whos-that-button ${buttonStyle}`}
      onClick={() => handleOnClick()}
      whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.9, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      <div className={`${fontStyle}`}>Who's That Pokémon?</div>
      <motion.img
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="whos-that-image"
        src={pokeBall}
        alt={`Pokéball`}
      />
    </motion.button>
  );
};

export default WhosThatPokemon;

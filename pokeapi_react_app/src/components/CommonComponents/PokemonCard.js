import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import PokemonCardLoading from "./PokemonCardLoading";

// Create individual Pokémon cards
const PokemonCard = ({ obj, i, isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const cardStyle = isDarkMode
    ? "component-background-dark"
    : "component-background-light";
  const cardTitleStyle = isDarkMode ? "font-dark" : "font-light";

  // Set and update loading state to show the loaded card when the image has finished loading in
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Get the Pokémon number and normalize it to four digits
  const cardNum = "000" + i;

  // If the image is still loading, display the loading card. Otherwise, show the full Pokémon card with image
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.95, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      {!isImageLoaded && <PokemonCardLoading isDarkMode={isDarkMode} />}
      <Link
        className={`pokemon-card ${cardStyle}`}
        style={{ display: isImageLoaded ? "flex" : "none" }}
        to="./pokemon"
      >
        <div className={`pokemon-card-title ${cardTitleStyle}`}>
          {obj.name[0].toUpperCase() + obj.name.slice(1)}
        </div>
        <img
          className="pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`}
          alt={`${obj.name} card`}
          onLoad={handleImageLoad}
        />
        <div className={`pokemon-card-number ${cardTitleStyle}`}>
          #{cardNum.slice(cardNum.length - 4)}
        </div>
      </Link>
    </motion.div>
  );
};

export default PokemonCard;

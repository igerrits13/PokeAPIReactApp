import { Link } from "react-router-dom";
import { motion } from "motion/react";

// Set timeout for testing if loading is working
// const rand = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
// console.log("random: ", rand);
// const data = await new Promise((resolve) => setTimeout(resolve, rand));

// Create individual Pokémon cards
const PokemonCard = ({ obj, i }) => {
  const cardNum = "000" + i;
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.95, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      <Link className="pokemon-card">
        <div className="pokemon-card-title">
          {obj.name[0].toUpperCase() + obj.name.slice(1)}
        </div>
        <img
          className="pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`}
          alt={`${obj.name} card`}
        />
        <div className="pokemon-card-number">
          #{cardNum.slice(cardNum.length - 4)}
        </div>
      </Link>
    </motion.div>
  );
};

export default PokemonCard;

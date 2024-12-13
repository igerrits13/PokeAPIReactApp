import { Link } from "react-router-dom";

// Create individual Pokémon cards
const PokemonCard = ({ obj, i }) => {
  const cardNum = "00" + i;
  return (
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
  );
};

export default PokemonCard;

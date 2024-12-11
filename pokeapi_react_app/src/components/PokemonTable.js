import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Table showing Pokémon cards
const PokemonTable = ({ screenSize }) => {
  const [pokeResults, setPokeResults] = useState([]);

  // Fetch the Pokémon information for cards
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
      .then((response) => response.json())
      .then((data) => {
        setPokeResults(data.results);
      });
  }, []);

  // Create a card for each Pokémon
  const cardsHTML = pokeResults.map((obj, i) => {
    const cardNum = "00" + (i + 1);
    return (
      <Link key={i} className="pokemon-card">
        <div className="pokemon-card-title">
          {obj.name[0].toUpperCase() + obj.name.slice(1)}
        </div>
        <img
          className="pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            i + 1
          }.png`}
          alt={`${obj.name} card`}
        />
        <div className="pokemon-card-number">
          #{cardNum.slice(cardNum.length - 3)}
        </div>
      </Link>
    );
  });

  // Set the Pokémon container to appropriate size based on viewport width
  if (screenSize === "small") {
    return <div className="pokemon-container-small">{cardsHTML}</div>;
  } else if (screenSize === "medium") {
    return <div className="pokemon-container-med">{cardsHTML}</div>;
  } else {
    return <div className="pokemon-container-large">{cardsHTML}</div>;
  }
};

export default PokemonTable;

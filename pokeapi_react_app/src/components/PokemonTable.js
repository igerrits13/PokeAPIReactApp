import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonTable = ({ screenSize }) => {
  const [pokeResults, setPokeResults] = useState([]);

  // Fetch the pokémon information for cards
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
      .then((response) => response.json())
      .then((data) => {
        setPokeResults(data.results);
      });
  }, []);

  // Create buttons for each type
  const cardsHTML = pokeResults.map((obj, i) => {
    return (
      <Link key={i} className="pokemon-card">
        <div className="pokemon-card-title">{obj.name}</div>
        <img
          className="pokemon-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            i + 1
          }.png`}
          alt="Ditto"
        />
        <div className="pokemon-card-number">#{i + 1}</div>
      </Link>
    );
  });

  if (screenSize === "small") {
    return <div className="pokemon-container-small">{cardsHTML}</div>;
  } else if (screenSize === "medium") {
    return <div className="pokemon-container-med">{cardsHTML}</div>;
  } else {
    return <div className="pokemon-container-large">{cardsHTML}</div>;
  }
};

export default PokemonTable;

import { useNavigate } from "react-router-dom";

// Button that loads a random Pokémon with blank details
const WhosThatPokemon = ({
  whosThatPokemon,
  setWhosThatPokemon,
  pokeResults,
}) => {
  // Allow for navigating to another page
  const navigate = useNavigate();

  // When clicked, set the details to blank and load a random Pokémon page
  const handleOnClick = () => {
    setWhosThatPokemon(!whosThatPokemon);
    const randPokemon = Math.floor(Math.random() * pokeResults.length);
    navigate(`/pokemon/${pokeResults[randPokemon].name}`);
  };

  // Display the Who's that Pokémon button
  return <button onClick={() => handleOnClick()}>Who's That Pokémon</button>;
};

export default WhosThatPokemon;

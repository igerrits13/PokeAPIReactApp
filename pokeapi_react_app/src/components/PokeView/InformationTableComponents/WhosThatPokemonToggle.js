const WhosThatPokemonToggle = ({ whosThatPokemon, setWhosThatPokemon }) => {
  return (
    <button onClick={() => setWhosThatPokemon(!whosThatPokemon)}>
      Reveal Pokémon!
    </button>
  );
};

export default WhosThatPokemonToggle;

// Normal or shiny image of current Pokémon
const PokeImage = ({ pokeData, whosThatPokemon, isNormalToggle }) => {
  // Display the normal or shiny image of the current Pokémon
  return (
    <div className="pokeview-image-container">
      {pokeData.sprites.other["official-artwork"].front_default !== null ? (
        <img
          className={`pokeview-image ${
            whosThatPokemon ? "pokeview-image-dark" : ""
          }`}
          src={
            isNormalToggle
              ? pokeData.sprites.other["official-artwork"].front_default
              : pokeData.sprites.other["official-artwork"].front_shiny
          }
          alt={`${pokeData.species.name}`}
        />
      ) : (
        <div className="pokeview-image">No image found!</div>
      )}
    </div>
  );
};

export default PokeImage;

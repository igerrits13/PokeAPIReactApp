// Normal or shiny image of current Pokémon
const PokeImage = ({ pokeData, isNormalToggle }) => {
  // Display the normal or shiny image of the current Pokémon
  return (
    <div className="pokeview-image-container">
      <img
        className="pokeview-image"
        src={
          isNormalToggle
            ? pokeData.sprites.other["official-artwork"].front_default
            : pokeData.sprites.other["official-artwork"].front_shiny
        }
        alt={`${pokeData.species.name}`}
      />
    </div>
  );
};

export default PokeImage;

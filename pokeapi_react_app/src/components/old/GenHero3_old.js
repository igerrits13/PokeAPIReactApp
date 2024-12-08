// Display banner for any generation that has four important pokemon
const GenHero3Old = ({ currGen }) => {
  console.log(currGen.id);
  // Seperate out the integer from the url
  const parts =
    currGen.id === 9
      ? currGen.pokemon_species[1].url.split("/")
      : currGen.pokemon_species[0].url.split("/");
  const cleanedParts = parts.filter((part) => part !== "");
  const lastPart = cleanedParts[cleanedParts.length - 1];
  let number = parseInt(lastPart, 10);
  if (currGen.id === 5) {
    number++;
  }

  console.log(number);

  return (
    <div className="d-flex w-75 mt-5 mb-3 mx-auto align-items-center rounded genHeroContainer">
      <div className="text-center fs-1 fw-bolder w-75 genHeroText">
        {currGen.name[0].toUpperCase() + currGen.name.slice(1)} -{" "}
        {currGen.main_region.name[0].toUpperCase() +
          currGen.main_region.name.slice(1)}{" "}
        Region
      </div>
      <div className="d-flex opacity-25 gradient3">
        <div className="w-33">
          <img
            className="img-fluid genImg"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
            alt="Gen Third Starter"
          />
        </div>
        <div className="w-33">
          <img
            className="img-fluid genImg"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              number + 3
            }.png`}
            alt="Gen Third Starter"
          />
        </div>
        <div className="w-33">
          <img
            className="img-fluid genImg"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              number + 6
            }.png`}
            alt="Gen Third Starter"
          />
        </div>
      </div>
    </div>
  );
};

export default GenHero3Old;

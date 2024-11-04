const GenHero = () => {
  return (
    <div className="d-flex my-2 align-items-center overflow-hidden rounded genHeroContainer">
      <h1 className="text-center fw-bolder text-capitalize w-100 genHeroText">
        Hero text goes here!
      </h1>
      <div className="d-flex">
        <div className="opacity-25 genLeft-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Gen Special Pokémon"
          />
        </div>
        <div className="opacity-25 genMid-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt="Gen First Starter"
          />
        </div>
        <div className="opacity-25 genMid2-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            alt="Gen Second Starter"
          />
        </div>
        <div className="opacity-25 genRight-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            alt="Gen Third Starter"
          />
        </div>
      </div>
    </div>
  );
};

export default GenHero;

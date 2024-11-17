// Generation banner for first generation
const GenHero4 = ({ currGen }) => {
  return (
    <div className="d-flex w-75 mt-5 mb-3 mx-auto align-items-center rounded genHeroContainer">
      <div className="text-center fs-1 fw-bolder w-75 genHeroText">
        {currGen.name[0].toUpperCase() + currGen.name.slice(1)} -{" "}
        {currGen.main_region.name[0].toUpperCase() +
          currGen.main_region.name.slice(1)}{" "}
        Region
      </div>
      <div className="d-flex opacity-25 gradient4">
        <div className="w-25">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Gen Third Starter"
          />
        </div>
        <div className="w-25">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt="Gen Third Starter"
          />
        </div>
        <div className="w-25">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            alt="Gen Third Starter"
          />
        </div>
        <div className="w-25">
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            alt="Gen Third Starter"
          />
        </div>
      </div>
    </div>
  );
};

export default GenHero4;

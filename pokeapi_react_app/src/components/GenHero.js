// import ElectricType from "./icons/electric.svg";
// import GrassType from "./icons/grass.svg";
// import FireType from "./icons/fire.svg";
// import WaterType from "./icons/water.svg";

const GenHero = () => {
  return (
    <div className="d-flex align-items-center my-4 h-25 w-75 overflow-hidden rounded genHeroContainer">
      <h1 className="genHeroText text-center w-75">Hero text goes here!</h1>
      <div className="d-flex">
        <div className="opacity-50 genLeft-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Gen Special Pokémon"
          />
        </div>
        <div className="opacity-50 genMid-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            alt="Gen First Starter"
          />
        </div>
        <div className="opacity-50 genMid2-4">
          <img
            className="img-fluid genHeroImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            alt="Gen Second Starter"
          />
        </div>
        <div className="opacity-50 genRight-4">
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

import ElectricType from "./icons/electric.svg";
import GrassType from "./icons/grass.svg";
import FireType from "./icons/fire.svg";
import WaterType from "./icons/water.svg";

const GenHero = () => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row w-100">
        <div className="col genLeft opacity-50 h-50 genImgBox">
          <img className="electricType" src={ElectricType}></img>
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          ></img>
        </div>
        <div className="col genMid opacity-50 h-50 genImgBox">
          <img className="grassType" src={GrassType}></img>
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          ></img>
        </div>
        <div className="col genMid2 opacity-50 h-50 genImgBox">
          <img className="fireType" src={FireType}></img>
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
          ></img>
        </div>
        <div className="col genRight opacity-50 h-50 genImgBox">
          <img className="waterType" src={WaterType}></img>
          <img
            className="img-fluid genImg"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default GenHero;

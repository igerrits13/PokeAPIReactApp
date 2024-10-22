import ElectricType from "./icons/electric.svg";
import GrassType from "./icons/grass.svg";
import FireType from "./icons/fire.svg";
import WaterType from "./icons/water.svg";

const GenHero = () => {
  return (
    <div>
      <div className="container d-flex">
        <div className="row w-100 p-4 my-2">
          <h1 className="fw-bolder genHeroText">Name goes here!</h1>
          <div className="col opacity-50 genLeft">
            {/* <div className="typeImg electricType">
             <img src={ElectricType}></img>
           </div> */}
            <img
              className="overflow-hidden w-50 genImg"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            ></img>
          </div>
          <div className="col opacity-50 genMid">
            <img
              className="overflow-hidden w-50 genImg"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            ></img>
          </div>
          <div className="col opacity-50 genMid2">
            <img
              className="overflow-hidden w-50 genImg"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            ></img>
          </div>
          <div className="col opacity-50 genRight">
            <img
              className="overflow-hidden w-50 genImg"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenHero;

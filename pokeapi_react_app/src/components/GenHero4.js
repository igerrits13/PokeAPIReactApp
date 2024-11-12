// import { useEffect, useState } from "react";

// const GenHero4 = ({ GenData }) => {
const GenHero4 = ({ currGen }) => {
  // const [currGen, setCurrGen] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // //  Load in data for the current generation
  // useEffect(() => {
  //   // fetch(`${GenData.url}`)
  //   fetch(`https://pokeapi.co/api/v2/generation/1/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCurrGen(data);
  //       setIsLoading(false);
  //       console.log(data.pokemon_species);
  //     });
  // }, []);

  // const currPoke = currGen.pokemon_species.map((obj, i) => {
  //   return <div key={i}>{obj.pokemon_species}</div>;
  // });

  return (
    <div className="d-flex w-75 my-3 mx-auto align-items-center rounded genHeroContainer">
      <div className="text-center fs-1 fw-bolder w-75 genHeroText">
        {/* {isLoading
          ? `Loading...`
          : // : `${GenData.name} - ${currGen.main_region.name} region`}
            `Gen 1 - ${currGen.main_region.name} region`} */}
        {currGen.name} - {currGen.main_region.name} region
      </div>
      <div className="d-flex opacity-25 gradient">
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
      {/* {currPoke} */}
    </div>
  );
};

export default GenHero4;

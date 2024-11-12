// import GenDisplay from "./GenDisplay";
import GenHero4 from "./GenHero4";
import { useState, useEffect } from "react";

const GenSection = () => {
  const [currGen, setCurrGen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  Load in data for the current generation
  useEffect(() => {
    // fetch(`${GenData.url}`)
    fetch(`https://pokeapi.co/api/v2/generation/1/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrGen(data);
        setIsLoading(false);
        console.log(data.pokemon_species);
      });
  }, []);

  return (
    <div>
      {isLoading ? isLoading : <GenHero4 currGen={currGen} />}
      {/* {isLoading
        ? `Loading...`
        : // : `${GenData.name} - ${currGen.main_region.name} region`}
          `${(<GenHero4 currGen={currGen} />)}
           ${(<GenDisplay currGen={currGen} />)}
            `} */}
    </div>
  );
};

export default GenSection;

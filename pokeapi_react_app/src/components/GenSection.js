// import GenDisplay from "./GenDisplay";
import GenHero4 from "./GenHero4";
import { useState, useEffect } from "react";

const GenSection = ({ genData }) => {
  const [currGen, setCurrGen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  Load in data for the current generation
  useEffect(() => {
    fetch(`${genData.url}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrGen(data);
        setIsLoading(false);
        // console.log(data.pokemon_species);
      });
  }, [genData]);

  return (
    <div>
      {isLoading ? (
        `Loading...`
      ) : (
        <div>
          <GenHero4 currGen={currGen.main_region} />
          {/* <GenDisplay currGen={currGen.pokemon_species} /> */}
        </div>
      )}
    </div>
  );
};

export default GenSection;

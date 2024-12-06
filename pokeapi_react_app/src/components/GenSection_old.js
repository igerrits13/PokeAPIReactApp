import { useState, useEffect } from "react";
import GenDisplay from "./GenDisplay_old";
import GenHero3 from "./GenHero3_old";
import GenHero4 from "./GenHero4_old";

// Container for the current Pokémon generation used to make generational API calls and setup each generational section
const GenSection = ({ genData }) => {
  // const GenSection = () => {
  const [currGen, setCurrGen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  Load in data for the current generation
  useEffect(() => {
    fetch(`${genData.url}`)
      // fetch(`https://pokeapi.co/api/v2/generation/1/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrGen(data);
        setIsLoading(false);
      });
  }, [genData]);
  // }, []);

  return (
    <div className="my-5">
      {isLoading ? (
        `Loading...`
      ) : (
        <div>
          <div>
            {currGen.id === 1 ? (
              <GenHero4 currGen={currGen} />
            ) : (
              <GenHero3 currGen={currGen} />
            )}
            <GenDisplay currGen={currGen.pokemon_species} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenSection;

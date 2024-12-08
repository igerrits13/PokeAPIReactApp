import { useState, useEffect } from "react";
import GenDisplayOld from "./GenDisplay_old";
import GenHero3Old from "./GenHero3_old";
import GenHero4Old from "./GenHero4_old";

// Container for the current Pokémon generation used to make generational API calls and setup each generational section
const GenSectionOld = ({ genData }) => {
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
              <GenHero4Old currGen={currGen} />
            ) : (
              <GenHero3Old currGen={currGen} />
            )}
            <GenDisplayOld currGen={currGen.pokemon_species} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenSectionOld;

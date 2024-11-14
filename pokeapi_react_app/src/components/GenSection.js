import GenDisplay from "./GenDisplay";
import GenHero3 from "./GenHero3";
import GenHero4 from "./GenHero4";
import { useState, useEffect } from "react";

// Container for the current Pokémon generation used to make generational API calls and setup each generational section
// const GenSection = ({ genData }) => {
const GenSection = () => {
  const [currGen, setCurrGen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  Load in data for the current generation
  useEffect(() => {
    // fetch(`${genData.url}`)
    fetch(`https://pokeapi.co/api/v2/generation/5/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrGen(data);
        setIsLoading(false);
        // console.log(data.pokemon_species);
      });
    // }, [genData]);
  }, []);

  return (
    <div>
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

  // return (
  //   <div>
  //     {isLoading ? (
  //       `Loading...`
  //     ) : (
  //       <div>
  //         <div>
  //           <GenHero4 currGen={currGen} />
  //           {/* <GenDisplay currGen={currGen.pokemon_species} /> */}
  //           <div id="carouselExample" className="carousel slide">
  //             <div className="carousel-inner"></div>
  //             <GenDisplay currGen={currGen.pokemon_species} />
  //             <button
  //               className="carousel-control-prev"
  //               type="button"
  //               data-bs-target="#carouselExample"
  //               data-bs-slide="prev"
  //             >
  //               <span
  //                 className="carousel-control-prev-icon"
  //                 aria-hidden="true"
  //               ></span>
  //               <span className="visually-hidden">Previous</span>
  //             </button>
  //             <button
  //               className="carousel-control-next"
  //               type="button"
  //               data-bs-target="#carouselExample"
  //               data-bs-slide="next"
  //             >
  //               <span
  //                 className="carousel-control-next-icon"
  //                 aria-hidden="true"
  //               ></span>
  //               <span className="visually-hidden">Next</span>
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default GenSection;

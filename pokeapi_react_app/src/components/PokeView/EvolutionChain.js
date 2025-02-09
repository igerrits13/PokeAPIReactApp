import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../CommonComponents/PokemonCard";

const EvolutionChain = ({ pokeChainURL, screenSize, isDarkMode }) => {
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  const [pokeChainData, setPokeChainData] = useState(null);
  const [isPokeChainLoading, setIsPokeChainLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data for the current Pokémon chain
  useEffect(() => {
    const fetchData = async () => {
      setIsPokeChainLoading(true);
      try {
        const [response] = await Promise.all([fetch(`${pokeChainURL}`)]);
        if (!response) {
          return;
        }
        const jsonData = await response.json();
        setPokeChainData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsPokeChainLoading(false);
      }
    };

    fetchData();
  }, [pokeChainURL]);

  const flexboxRef = useRef(null);

  // useEffect(() => {
  //   if (!isPokeChainLoading) {
  //     // Adjust scroll position to start in the middle after the component has mounted
  //     const flexbox = flexboxRef.current;
  //     const middleScrollPosition = flexbox.scrollHeight / 2.5;
  //     flexbox.scrollTop = middleScrollPosition;
  //   }
  // }, [isPokeChainLoading]);

  // If the API call returns an error, navigate to the page not found
  // (Redundant to inside fetch call to avoid compilation error)
  if (error) {
    navigate("/notfound");
    return;
  }

  const getPokeNum = (pokeURL) => {
    // Seperate out the integer from the url
    const urlArr = pokeURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

  const getEvolutions = (evolutions) => {
    // console.log(evolutions);
    //   <div
    //     className={`evolution-chain-section-horizontal ${
    //       Object.entries(pokeChainData.chain.evolves_to).length === 1
    //         ? "flex-centered"
    //         : ""
    //     }
    // }`}
    //     // ref={flexboxRef}
    //   >
    return evolutions.map((evolution, i) => {
      console.log(evolution);
      return (
        <div key={i}>
          <div className="evolution-chain-icon-row">
            <i className="fa-solid fa-arrow-right-long" />
            <div className="evolution-chain-card">
              <PokemonCard
                obj={evolution[1].species}
                i={getPokeNum(evolution[1].species.url)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          {/* {console.log("Before recusive")}
              {console.log(Object.entries(evolution[1].evolves_to))} */}
          {evolution[1].evolves_to &&
            getEvolutions(Object.entries(evolution[1].evolves_to))}
        </div>
      );
    });
  };

  // const getEvolutions = (evolutions) => {
  //   return evolutions.map((evolution, i) => {
  //     return (
  //       <div className="evolution-chain-icon-row" key={i}>
  //         <i className="fa-solid fa-arrow-right-long" />
  //         <div className="evolution-chain-card">
  //           <PokemonCard
  //             obj={evolution[1].species}
  //             i={getPokeNum(evolution[1].species.url)}
  //             isDarkMode={isDarkMode}
  //           />
  //         </div>
  //         {/* Recursively call getEvolutions if there is a next evolution */}
  //         {evolution.evolves_to &&
  //           getEvolutions(Object.entries(evolution.evolves_to))}
  //       </div>
  //     );
  //   });
  // };

  // <div className="evolution-chain-card" key={i}>
  //   <PokemonCard
  //     obj={evolution[1].species}
  //     i={getPokeNum(evolution[1].species.url)}
  //     isDarkMode={isDarkMode}
  //   />
  // </div>

  return (
    <>
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
        Evolution Chain
      </div>
      {!isPokeChainLoading && (
        <div className={`evolution-chain-container-horizontal ${fontStyle}`}>
          <div className="evolution-chain-section-horizontal flex-centered">
            <div className="evolution-chain-icon-row">
              <div className="evolution-chain-card">
                <PokemonCard
                  obj={pokeChainData.chain.species}
                  i={getPokeNum(pokeChainData.chain.species.url)}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
          <div
            className={`evolution-chain-section-horizontal ${
              Object.entries(pokeChainData.chain.evolves_to).length === 1
                ? "flex-centered"
                : ""
            }
          }`}
            ref={flexboxRef}
          >
            {getEvolutions(Object.entries(pokeChainData.chain.evolves_to))}
          </div>
        </div>
      )}
    </>
  );
};

export default EvolutionChain;

// const genHTML = genResults.map((obj, i) => {
//   return (
//     <option key={i} className={`${optionStyle}`} value={`${i + 1}`}>
//       {formattedGenName}
//     </option>
//   );
// });

// {getEvolutions(Object.entries(pokeChainData.chain.evolves_to))}

// const evoHTML = !isPokeChainLoading && (
//   <div className={`evolution-chain-container-horizontal ${fontStyle}`}>
//     <div className="evolution-chain-card">
//       <PokemonCard
//         obj={pokeChainData.chain.species}
//         i={getPokeNum(pokeChainData.chain.species.url)}
//         isDarkMode={isDarkMode}
//       />
//     </div>
//     <div className="evolution-chain-icon-row">
//       {/* {console.log(
//         getEvolutions(Object.entries(pokeChainData.chain.evolves_to))
//       )} */}
//       {getEvolutions(Object.entries(pokeChainData.chain.evolves_to))}
//     </div>
//     {/* {pokeChainData.chain.evolves_to[0] !== undefined && (
//       <div className="evolution-chain-section-horizontal">
// <div className="evolution-chain-icon-row">
//   <i className="fa-solid fa-arrow-right-long" />
//   <div className="evolution-chain-card">
//     <PokemonCard
//       obj={pokeChainData.chain.evolves_to[0].species}
//       i={getPokeNum(pokeChainData.chain.evolves_to[0].species.url)}
//       isDarkMode={isDarkMode}
//     />
//   </div>
// </div>
//       </div>
//     )}
//     {pokeChainData.chain.evolves_to[0] !== undefined &&
//       pokeChainData.chain.evolves_to[0].evolves_to[0] !== undefined && (
//         <div className="evolution-chain-section-horizontal">
//           <div className="evolution-chain-icon-row">
//             <i className="fa-solid fa-arrow-right-long"></i>
//             <div className="evolution-chain-card">
//               <PokemonCard
//                 obj={pokeChainData.chain.evolves_to[0].evolves_to[0].species}
//                 i={getPokeNum(
//                   pokeChainData.chain.evolves_to[0].evolves_to[0].species.url
//                 )}
//                 isDarkMode={isDarkMode}
//               />
//             </div>
//           </div>
//         </div>
//       )} */}
//   </div>
// );

// import { useState, useEffect } from "react";
import GenSection from "./GenSection";
// import GenHero4 from "./GenHero4";

// Container to initialize the API calls and displays for each Pokémon generation
const GenTable = () => {
  // const [genData, setGenData] = useState([]);

  // // Fetch basic generation data
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/generation/?limit=-1`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setGenData(data.results);
  //     });
  // }, []);

  // // Create a section for each generation
  // const genHTML = genData.map((obj, i) => {
  //   return <GenSection genData={obj} key={i} />;
  // });

  // return <div>{genHTML}</div>;

  return <GenSection />;
};

export default GenTable;

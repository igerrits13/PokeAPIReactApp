import { useState, useEffect } from "react";
import GenSectionOld from "./GenSection_old";

// Container to initialize the API calls and displays for each Pokémon generation
const GenTableOld = () => {
  const [genData, setGenData] = useState([]);

  // Fetch basic generation data
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation`)
      .then((response) => response.json())
      .then((data) => {
        setGenData(data.results);
      });
  }, []);

  // Create a section for each generation
  const genHTML = genData.map((obj, i) => {
    return <GenSectionOld genData={obj} key={i} />;
  });

  return <div>{genHTML}</div>;

  // return <GenSection />;
};

export default GenTableOld;

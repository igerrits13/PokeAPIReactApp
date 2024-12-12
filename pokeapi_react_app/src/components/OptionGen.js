import { useState, useEffect } from "react";

// Handles the logic for filtering Pokémon by gen
const OptionGen = ({ filterByGen, setFilterByGen }) => {
  const [genResults, setGenResults] = useState([]);

  // Fetch the generations
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        setGenResults(data.results);
      });
  }, []);

  // Create the HTML for the dropdown view for filtering by gen
  const genHTML = genResults.map((obj, i) => {
    const genName = obj.name.split("-");
    const formattedGenName =
      genName[0][0].toUpperCase() +
      genName[0].slice(1) +
      " " +
      genName[1].toUpperCase();
    return (
      <option key={i} value={`${i + 1}`}>
        {formattedGenName}
      </option>
    );
  });

  // Update the current gen based on what value has been selected
  const updateGen = (e) => {
    setFilterByGen(e.target.value);
  };

  // Create the view of the filter dropdown
  return (
    <div className="sortoptions-item sortoption-text">
      <label htmlFor="generation">Filter by Generation</label>
      <select
        name="generation"
        id="generation"
        value={filterByGen}
        onChange={updateGen}
      >
        <option value="0">All</option>
        {genHTML}
      </select>
    </div>
  );
};

export default OptionGen;

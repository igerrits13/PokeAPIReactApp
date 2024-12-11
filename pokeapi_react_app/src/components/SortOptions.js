import { useState, useEffect } from "react";

// Show sort and filter options allowed for searching Pokémon
const SortOptions = ({
  screenSize,
  filterByGen,
  setFilterByGen,
  filterByType,
  setFilterByType,
  typesResults,
  sortBy,
  setSortBy,
}) => {
  const [genResults, setGenResults] = useState([]);

  // Fetch the generations
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        setGenResults(data.results);
      });
  }, []);

  const updateGen = (e) => {
    console.log(`Sort by: ${e.target.value}`);
    setFilterByGen(e.target.value);
  };

  const updateType = (e) => {
    console.log(`Sort by: ${e.target.value}`);
    setFilterByType(e.target.value);
  };

  const updateSort = (e) => {
    console.log(`Sort by: ${e.target.value}`);
    setSortBy(e.target.value);
  };

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

  const typesHTML = typesResults.map((obj, i) => {
    if (obj.name !== "unknown" && obj.name !== "stellar") {
      return (
        <option key={i} value={`${obj.name}`}>
          {obj.name}
        </option>
      );
    } else {
      return <option key={i} value="none"></option>;
    }
  });

  const sortHTML = (
    <>
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
      <div className="sortoptions-item sortoption-text">
        <label htmlFor="types">Filter by Type</label>
        <select
          name="types"
          id="types"
          value={filterByType}
          onChange={updateType}
        >
          <option value="all">All</option>
          {typesHTML}
        </select>
      </div>
      <div className="sortoptions-item sortoption-text">
        <label htmlFor="sortby">Sort by</label>
        <select name="sortby" id="sortby" value={sortBy} onChange={updateSort}>
          <option value="number">Number</option>
          <option value="name">Name</option>
        </select>
      </div>
    </>
  );

  // If screen is small, have options in a column
  if (screenSize === "small") {
    return <div className="sortoptions-container-small">{sortHTML}</div>;
  }
  // Otherwise, display options in a row
  else {
    return <div className="sortoptions-container-med-large">{sortHTML}</div>;
  }
};

export default SortOptions;

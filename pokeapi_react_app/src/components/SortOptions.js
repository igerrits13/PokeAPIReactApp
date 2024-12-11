// Show sort and filter options allowed for searching Pokémon
const SortOptions = ({
  screenSize,
  filterByGen,
  setFilterByGen,
  filterByType,
  setFilterByType,
  sortBy,
  setSortBy,
}) => {
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
          <option value="1">Gen 1</option>
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
          <option value="fire">Fire</option>
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

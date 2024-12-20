// Handles the logic for filtering Pokémon by type
const OptionType = ({ filterByType, setFilterByType, typesResults }) => {
  // Create the HTML for the dropdown view for filtering by type
  const typesHTML = typesResults
    .slice(0, typesResults.length - 2)
    .map((obj, i) => {
      return (
        <option key={i} value={i + 1}>
          {obj.name[0].toUpperCase() + obj.name.slice(1)}
        </option>
      );
    });

  // Update the current type based on what value has been selected
  const updateType = (e) => {
    setFilterByType(e.target.value);
  };

  // Create the view of the filter dropdown
  return (
    <div className="sortoptions-item sortoption-text">
      <label htmlFor="types">Filter by Type</label>
      <select
        className="sortoptions-dropdown"
        name="types"
        id="types"
        value={filterByType}
        onChange={updateType}
      >
        <option value="all">All</option>
        {typesHTML}
      </select>
    </div>
  );
};

export default OptionType;

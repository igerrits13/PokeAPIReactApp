// Handles the logic for filtering Pokémon by type
const OptionType = ({ filterByType, setFilterByType, typesResults }) => {
  // Create the HTML for the dropdown view for filtering by type
  const typesHTML = typesResults.map((obj, i) => {
    if (obj.name !== "unknown" && obj.name !== "stellar") {
      return (
        // <option key={i} value={`${obj.name}`}>
        <option key={i} value={i + 1}>
          {obj.name}
        </option>
      );
    } else {
      return <option key={i} value="none"></option>;
    }
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

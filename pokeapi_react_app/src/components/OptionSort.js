// Handles the logic for sorting Pokémon by name or number
const OptionSort = ({ sortBy, setSortBy }) => {
  // Update the current sort method based on what value has been selected
  const updateSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="sortoptions-item sortoption-text">
      <label htmlFor="sortby">Sort by</label>
      <select name="sortby" id="sortby" value={sortBy} onChange={updateSort}>
        <option value="number">Number</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default OptionSort;

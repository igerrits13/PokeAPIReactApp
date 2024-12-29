// Handles the logic for sorting Pokémon by name or number
const OptionSort = ({ sortBy, setSortBy, isDarkMode }) => {

      // Setup the search bar style based on if the user is using light or dark mode
      const optionStyle = isDarkMode
      ? "font-dark component-background-dark "
      : "font-light component-background-light ";

      const optionTextStyle = isDarkMode
      ? "font-dark"
      : "font-light";

  // Update the current sort method based on what value has been selected
  const updateSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={`sortoptions-item sortoption-text ${optionTextStyle}`}>
      <label htmlFor="sortby">Sort by</label>
      <select
        className={`sortoptions-dropdown ${optionStyle}`}
        name="sortby"
        id="sortby"
        value={sortBy}
        onChange={updateSort}
      >
        <option className={`${optionStyle}`} value="number">Number</option>
        <option className={`${optionStyle}`} value="name">Name</option>
      </select>
    </div>
  );
};

export default OptionSort;

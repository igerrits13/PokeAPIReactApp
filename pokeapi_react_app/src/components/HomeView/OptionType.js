// Displays the options for filtering by type
const OptionType = ({
  filterByType,
  setFilterByType,
  typesResults,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const optionStyle = isDarkMode
    ? "font-dark component-background-dark "
    : "font-light component-background-light ";
  const optionTextStyle = isDarkMode ? "font-dark" : "font-light";

  // Create the HTML for the dropdown view for filtering by type
  const typesHTML = typesResults
    .slice(0, typesResults.length - 2)
    .map((obj, i) => {
      return (
        <option className={`${optionStyle}`} key={i} value={i + 1}>
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
    <div className={`sortoptions-item sortoption-text ${optionTextStyle}`}>
      <label htmlFor="types">Filter by Type</label>
      <select
        className={`sortoptions-dropdown ${optionStyle}`}
        name="types"
        id="types"
        value={filterByType}
        onChange={updateType}
      >
        <option className={`${optionStyle}`} value="all">
          All
        </option>
        {typesHTML}
      </select>
    </div>
  );
};

export default OptionType;

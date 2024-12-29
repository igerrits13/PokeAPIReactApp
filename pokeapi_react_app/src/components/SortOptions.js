import OptionSort from "./OptionSort";
import OptionType from "./OptionType";
import OptionGen from "./OptionGen";

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
  isDarkMode,
}) => {
  const sortHTML = (
    <>
      <OptionGen
        filterByGen={filterByGen}
        setFilterByGen={setFilterByGen}
        isDarkMode={isDarkMode}
      />
      <OptionType
        filterByType={filterByType}
        setFilterByType={setFilterByType}
        typesResults={typesResults}
        isDarkMode={isDarkMode}
      />
      <OptionSort
        sortBy={sortBy}
        setSortBy={setSortBy}
        isDarkMode={isDarkMode}
      />
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

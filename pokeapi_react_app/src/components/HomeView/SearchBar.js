import { useState } from "react";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({ fullPokeResults, isDarkMode }) => {
  const [searchText, setSearchText] = useState("");
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [resultsHTML, setResultsHTML] = useState([]);

  // Setup the search bar style based on if the user is using light or dark mode
  const searchFontStyle = isDarkMode
    ? "searchbar-font-dark component-background-dark component-outline-dark"
    : "searchbar-font-light component-background-light component-outline-light";

  const searchIconStyle = isDarkMode
    ? "icon-dark component-outline-background-dark"
    : "icon-light component-outline-background-light";

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Update state for when the search bar is being focused
  const handleOnFocus = () => {
    setSearchBarFocus(true);
  };

  const handleOnBlur = () => {
    setSearchBarFocus(false);
  };

  // Automatically fill the search text based on key pressed
  const autoFillSearchText = (e) => {
    // When 'Tab' is pressed, autofill search text with the next filtered Pokémon
    if (e.key === "Tab") {
      e.preventDefault();
      if (resultsHTML.length > 0) {
        setSearchText(resultsHTML[0].props.resultItem.name);
      }
    }
  };

  return (
    <div>
      <form className="searchbar-container">
        <input
          type="text"
          className={`searchbar-input ${searchFontStyle}`}
          placeholder="Search Pokémon . . ."
          aria-label="Search Pokémon"
          value={searchText}
          onChange={updateSearchText}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={autoFillSearchText}
        />
        <button className={`searchbar-search-icon ${searchIconStyle}`}>
          <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>{" "}
        </button>
      </form>
      <SearchResults
        searchText={searchText}
        searchBarFocus={searchBarFocus}
        fullPokeResults={fullPokeResults}
        resultsHTML={resultsHTML}
        setResultsHTML={setResultsHTML}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SearchBar;

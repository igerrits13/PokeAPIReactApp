import { useState } from "react";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({ fullPokeResults }) => {
  const [searchText, setSearchText] = useState("");
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [resultsHTML, setResultsHTML] = useState([]);

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

  const autoFillSearchText = (e) => {
    if (e.key === "Tab") {
      console.log("Tab pushed");
      e.preventDefault();
      if (resultsHTML.length > 0) {
        console.log("Setting search text");
        setSearchText(resultsHTML[0].props.resultItem.name);
      }
    }
  };

  return (
    <div>
      <form className="searchbar-container">
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search Pokémon . . ."
          aria-label="Search Pokémon"
          value={searchText}
          onChange={updateSearchText}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={autoFillSearchText}
        />
        <button className="searchbar-search-icon">
          <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>{" "}
        </button>
      </form>
      <SearchResults
        searchText={searchText}
        searchBarFocus={searchBarFocus}
        fullPokeResults={fullPokeResults}
        resultsHTML={resultsHTML}
        setResultsHTML={setResultsHTML}
      />
    </div>
  );
};

export default SearchBar;

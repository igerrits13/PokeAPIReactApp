import { useState } from "react";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({ fullPokeResults }) => {
  const [searchText, setSearchText] = useState("");
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Update state for when the search bar is being hovered
  const handleMouseEnter = () => {
    setSearchBarActive(true);
  };

  const handleMouseLeave = () => {
    setSearchBarActive(false);
    if (!searchBarFocus) {
      clearSearchText();
    }
  };

  // Update state for when the search bar is being focused
  const handleOnFocus = () => {
    setSearchBarFocus(true);
  };

  const handleOnBlur = () => {
    setSearchBarFocus(false);
    if (!searchBarActive) {
      clearSearchText();
    }
  };

  // Clear search text when not hovered or focused
  const clearSearchText = () => {
    setSearchText("");
  };

  return (
    <div
      className="searchbar-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <form
        className={`searchbar-button ${
          searchBarActive || searchBarFocus ? "searchbar-active" : ""
        }`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        <input
          className="searchbar-input"
          type="search"
          value={searchText}
          onChange={updateSearchText}
          placeholder="Search Pokémon . . ."
          aria-label="Search Pokémon"
        />
        <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>
      </form>
      {searchBarActive || searchBarFocus ? (
        <div>
          <SearchResults
            searchText={searchText}
            fullPokeResults={fullPokeResults}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;

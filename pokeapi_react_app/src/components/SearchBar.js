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
  };

  // Update state for when the search bar is being focused
  const handleOnFocus = () => {
    setSearchBarFocus(true);
  };

  const handleOnBlur = () => {
    setSearchBarFocus(false);
    setSearchBarActive(false);
    clearSearchText();
  };

  // Clear search text when not hovered or focused
  const clearSearchText = () => {
    setSearchText("");
  };

  return (
    <div>
      <form
        className={`searchbar-container ${
          searchBarActive || searchText !== "" || searchBarFocus
            ? "searchbar-active"
            : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      {searchBarActive || searchText ? (
        <ul
          className=""
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li>Item here</li>
          {/* <SearchResults
            searchText={searchText}
            fullPokeResults={fullPokeResults}
          /> */}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;

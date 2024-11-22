import SearchResults from "./SearchResults";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch the list of all pokémon species
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      });
  }, []);

  // // Handle whether the search bar is being hovered over of not
  const handleSearchHover = () => {
    setIsSearchHovered(true);
  };

  const handleSearchUnHover = () => {
    setIsSearchHovered(false);
    if (!isSearchFocused) {
      clearSearchText();
    }
  };

  // // Handle whether the search bar is being hovered over of not
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (!isSearchHovered) {
      clearSearchText();
    }
  };

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Clear the search text
  const clearSearchText = () => {
    setSearchText("");
  };

  // Display the search bar if it is being hovered over of there is a text value in it
  const currSearch =
    isSearchHovered || searchText || isSearchFocused
      ? "bg-secondary showSearch"
      : "bg-body ";

  return (
    // <div>
    //   <div
    //     className={`rounded-pill mx-auto pokeSearch delay ${currSearch}`}
    //     role="search"
    //     onMouseEnter={handleSearchHover}
    //     onMouseLeave={handleSearchUnHover}
    //   >
    //     <input
    //       type="search"
    //       placeholder="Search Pokémon"
    //       value={searchText}
    //       onChange={updateSearchText}
    //       className="h-100 w-100 bg-secondary pokeSearchBar"
    //       aria-label="Search Pokémon"
    //     />
    //     <div
    //       className={"rounded-circle align-self-center bg-body searchButton"}
    //     >
    //       <i className="fa-solid fa-x searchIcon"></i>
    //       <img
    //         className="searchBall"
    //         src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/poke-ball.png"
    //         alt="Pokéball Search Icon"
    //         onClick={clearSearchText}
    //       ></img>
    //     </div>
    //   </div>
    //   <div
    //     className="dropdown-menu"
    //     onMouseEnter={handleSearchHover}
    //     onMouseLeave={handleSearchUnHover}
    //   >
    //     {isSearchHovered || searchText ? (
    //       <SearchResults
    //         searchText={searchText}
    //         searchResults={searchResults}
    //       />
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // </div>

    <div className="dropdown mx-auto w-25">
      <div
        className={`rounded-pill mx-auto pokeSearch delay ${
          isSearchHovered || isSearchFocused ? "dropdown-toggle" : ""
        } ${currSearch}`}
        role="search"
        onMouseEnter={handleSearchHover}
        onMouseLeave={handleSearchUnHover}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      >
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchText}
          onChange={updateSearchText}
          className="h-100 w-100 bg-secondary pokeSearchBar"
          aria-label="Search Pokémon"
        />
        <div
          className={"rounded-circle align-self-center bg-body searchButton"}
        >
          <i className="fa-solid fa-x searchIcon"></i>
          <img
            className="searchBall"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/poke-ball.png"
            alt="Pokéball Search Icon"
            onClick={clearSearchText}
          ></img>
        </div>
      </div>
      {isSearchHovered || isSearchFocused ? (
        <ul
          className="dropdown-menu w-100 d-block mt-0"
          onMouseEnter={handleSearchHover}
          onMouseLeave={handleSearchUnHover}
        >
          <SearchResults
            searchText={searchText}
            searchResults={searchResults}
          />
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;

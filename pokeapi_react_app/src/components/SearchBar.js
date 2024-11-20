import SearchResults from "./SearchResults";
import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  // // Handle whether the search bar is being hovered over of not
  const handleSearchHover = () => {
    console.log("Hovering");
    setIsSearchHovered(true);
  };

  const handleSearchUnHover = () => {
    console.log("Not hovering");
    setIsSearchHovered(false);
  };

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Display the search bar if it is being hovered over of there is a text value in it
  const currSearch =
    isSearchHovered || searchText ? "showSearch bg-secondary" : "bg-body ";

  return (
    <div>
      <div
        className={`rounded-pill mx-auto pokeSearch delay ${currSearch}`}
        role="search"
        onMouseEnter={handleSearchHover}
        onMouseLeave={handleSearchUnHover}
      >
        <input
          type="search"
          placeholder="Search Pokémon"
          value={searchText}
          onChange={updateSearchText}
          className="h-100 w-100 rounded-pill bg-secondary pokeSearchBar"
          aria-label="Search"
        />
        <div
          className={"rounded-circle align-self-center bg-body searchButton"}
        >
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          <img
            className="searchBall"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/poke-ball.png"
            alt="Pokéball Search Icon"
          ></img>
        </div>
      </div>
      {isSearchHovered || searchText ? <SearchResults /> : <></>}
    </div>
  );
};

export default SearchBar;

// import { useEffect, useState } from "react";
import { useState } from "react";

const SearchBar = ({ searchText, setSearchText }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle whether the search bar is being hovered over of not
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnHover = () => {
    setIsHovered(false);
  };

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Display the search bar if it is being hovered over of there is a text value in it
  const currSearch =
    isHovered || searchText ? "showSearch bg-secondary " : "bg-body ";

  return (
    <div className="container-md d-flex justify-content-center my-2">
      <form
        className={`rounded-pill pokeSearch delay ${currSearch}`}
        role="search"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
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
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokéball Search Icon"
          ></img>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

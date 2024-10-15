import { useEffect, useState } from "react";

const SearchBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnHover = () => {
    setIsHovered(false);
  };

  const currSearch = isHovered ? "showSearch bg-secondary " : "bg-body ";

  return (
    <div className="container">
      <div className="container-md d-flex justify-content-center my-5">
        <form
          className={`rounded-pill pokeSearch delay ${currSearch}`}
          role="search"
          onMouseEnter={handleHover}
          onMouseLeave={handleUnHover}
        >
          <input
            type="search"
            placeholder="Search Pokémon"
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
            ></img>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

// Search bar for searching Pokémon
const SearchBar = () => {
  return (
    <form>
      <input
        className="searchbar-input"
        type="search"
        placeholder="Search Pokémon . . ."
      />
      <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>
    </form>
  );
};

export default SearchBar;

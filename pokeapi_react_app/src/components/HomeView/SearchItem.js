import { Link } from "react-router-dom";

const SearchItem = ({ clearSearchText, resultItem, isDarkMode, i }) => {
  // Setup the search results style based on if the user is using light or dark mode
  const searchResultsItemsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";

  // Capitalize the first word of each part of the pokémon's name
  const getPokeName = (name) => {
    const formattedName = name.split(" ").map((obj) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Extract the Pokémon number from the Pokémon URL
  const parts = resultItem.url.split("/");
  const cleanedParts = parts.filter((part) => part !== "");
  const lastPart = cleanedParts[cleanedParts.length - 1];
  const number = parseInt(lastPart, 10);
  const pokeIdURL = `/pokemon/${number}`;

  return (
    <Link
      className={`search-results-item clean-text ${searchResultsItemsStyle}`}
      to={pokeIdURL}
      // onClick={clearSearchText}
      // onClick={() => clearSearchText()}
    >
      <div>
        <img
          className="search-result-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
          alt={`${resultItem.name}`}
        />
        {getPokeName(resultItem.name)}
      </div>
      <div>#{number}</div>
    </Link>
  );
};

export default SearchItem;

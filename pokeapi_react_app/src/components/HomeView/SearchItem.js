import { Link } from "react-router-dom";

const SearchItem = ({ resultItem, isDarkMode, i }) => {
  // Setup the search results style based on if the user is using light or dark mode
  const searchResultsItemsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";

  // Function to capitalize the first letter of each name
  function capitalizeFirstLetter(name) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  // Extract the Pokémon number from the Pokémon URL
  const parts = resultItem.url.split("/");
  const cleanedParts = parts.filter((part) => part !== "");
  const lastPart = cleanedParts[cleanedParts.length - 1];
  const number = parseInt(lastPart, 10);

  return (
    <Link
      className={`search-results-item clean-text ${searchResultsItemsStyle}`}
      to="/pokemon"
    >
      <div>
        <img
          className="search-result-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
          alt={`${resultItem.name}`}
        />
        {capitalizeFirstLetter(resultItem.name)}
      </div>
      <div>#{number}</div>
    </Link>
  );
};

export default SearchItem;

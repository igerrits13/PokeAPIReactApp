import { Link } from "react-router-dom";

// Filter and display the search results based on search text
function SearchBar({ searchText, searchResults }) {
  let searchHTML;

  // Function to capitalize the first letter of each name
  function capitalizeFirstLetter(name) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  // Create search results for each pokemon species. If there is search text,
  // filter the results and display them in numbered order
  if (searchText !== "") {
    searchHTML = searchResults
      .filter((res) => res.name.includes(`${searchText.toLowerCase()}`))
      .map((obj, i) => {
        return (
          <Link className="dropdown-item" to="./" key={i}>
            {capitalizeFirstLetter(obj.name)}
          </Link>
        );
      });
  }
  // Otherwise, display all Pokémon in order
  else {
    searchHTML = searchResults.map((obj, i) => {
      return (
        <Link className="dropdown-item" to="./" key={i}>
          {capitalizeFirstLetter(obj.name)}
        </Link>
      );
    });
  }

  return (
    <div>
      {Object.keys(searchHTML).length === 0 ? (
        <Link className="dropdown-item disabled" to="./">
          No Pokémon Found
        </Link>
      ) : (
        <div className="searchResults">{searchHTML.slice(0, 20)}</div>
      )}
    </div>
  );
}

export default SearchBar;

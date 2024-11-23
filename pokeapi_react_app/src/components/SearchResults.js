import { Link } from "react-router-dom";
import SearchResultItem from "./SearchResultItem";

// Filter and display the search results based on search text
function SearchBar({ searchText, searchResults }) {
  let searchHTML;

  // Create search results for each pokemon species. If there is search text,
  // filter the results and display them in numbered order
  if (searchText !== "") {
    searchHTML = searchResults
      .filter((res) => res.name.includes(`${searchText.toLowerCase()}`))
      .map((resultItem, i) => {
        return <SearchResultItem resultItem={resultItem} key={i} />;
      });
  }
  // Otherwise, display all Pokémon in order
  else {
    searchHTML = searchResults.map((resultItem, i) => {
      return <SearchResultItem resultItem={resultItem} key={i} />;
    });
  }

  return (
    <div>
      {Object.keys(searchHTML).length === 0 ? (
        <Link className="dropdown-item disabled" to="./">
          No Pokémon Found
        </Link>
      ) : (
        <div className="searchResults">{searchHTML.slice(0, 12)}</div>
      )}
    </div>
  );
}

export default SearchBar;

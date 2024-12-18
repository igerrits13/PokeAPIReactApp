import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";

const SearchResults = ({ searchText, fullPokeResults }) => {
  let searchHTML;

  // Create search results for each pokemon species. If there is search text,
  // filter the results and display them in numbered order
  if (searchText !== "") {
    searchHTML = fullPokeResults
      .filter((res) => res.name.includes(`${searchText.toLowerCase()}`))
      .map((resultItem, i) => {
        return <SearchItem resultItem={resultItem} key={i} />;
      });
  }
  // Otherwise, display all Pokémon in order
  else {
    searchHTML = fullPokeResults.map((resultItem, i) => {
      return <SearchItem resultItem={resultItem} key={i} />;
    });
  }

  return (
    <div>
      {Object.keys(searchHTML).length === 0 ? (
        <Link className="" to="./">
          No Pokémon Found
        </Link>
      ) : (
        <div className="">{searchHTML.slice(0, 12)}</div>
      )}
    </div>
  );
};

export default SearchResults;

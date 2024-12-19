import SearchItem from "./SearchItem";

// Display the dropdown search results from the search bar
const SearchResults = ({ searchText, fullPokeResults }) => {
  let searchHTML;

  // Create the first 12 Pokémon result items if no search text has been entered
  if (searchText === "") {
    searchHTML = fullPokeResults.slice(0, 12).map((resultItem, i) => {
      return <SearchItem resultItem={resultItem} key={i} />;
    });
  }
  // Otherwise, create the first 12 Pokémon with names containing the search text
  else {
    searchHTML = fullPokeResults
      .filter((res) => res.name.includes(`${searchText.toLowerCase()}`))
      .slice(0, 12)
      .map((resultItem, i) => {
        return <SearchItem resultItem={resultItem} key={i} />;
      });
  }

  return (
    <div>
      {Object.keys(searchHTML).length === 0 ? (
        <div className="search-results">
          <div className="search-results-item">No Pokémon Found</div>
        </div>
      ) : (
        <div className="search-results">{searchHTML}</div>
      )}
    </div>
  );
};

export default SearchResults;

import SearchItem from "./SearchItem";

// Display the dropdown search results from the search bar
const SearchResults = ({ searchText, searchBarFocus, fullPokeResults }) => {
  let searchHTML;

  // Create the first 12 Pokémon result items if no search text has been entered
  if (searchText === "") {
    searchHTML = fullPokeResults.slice(0, 12).map((resultItem, i) => {
      return <SearchItem resultItem={resultItem} key={i} />;
    });
  }
  // Otherwise, create the first 12 Pokémon with names or numbers containing the search text
  else {
    searchHTML = fullPokeResults
      .filter(
        (res, i) =>
          res.name.includes(`${searchText.toLowerCase()}`) ||
          (i + Number(1)).toString().includes(`${searchText}`)
      )
      .slice(0, 12)
      .map((resultItem, i) => {
        return <SearchItem resultItem={resultItem} key={i} />;
      });
  }

  if (searchHTML.length === 0) {
    searchHTML = <div className="search-results-item">No Pokémon Found</div>;
  }

  return (
    <div
      className={`search-results ${
        searchBarFocus ? "search-results-active" : ""
      }`}
    >
      {searchHTML}
    </div>

    // <div
    //   className={`search-results ${
    //     searchBarFocus ? "search-results-active" : ""
    //   }`}
    // >
    //   {searchHTML}
    // </div>

    // <div>
    //   {Object.keys(searchHTML).length === 0 ? (
    //     <div
    //       className={`search-results ${
    //         searchBarFocus ? "search-results-active" : ""
    //       }`}
    //     >
    //       <div className="search-results-item">No Pokémon Found</div>
    //     </div>
    //   ) : (
    //     <div
    //       className={`search-results ${
    //         searchBarFocus ? "search-results-active" : ""
    //       }`}
    //     >
    //       {searchHTML}
    //     </div>
    //   )}
    // </div>
  );
};

export default SearchResults;

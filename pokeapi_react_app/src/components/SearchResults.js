import { useEffect } from "react";
import SearchItem from "./SearchItem";

// Display the dropdown search results from the search bar
const SearchResults = ({
  searchText,
  searchBarFocus,
  fullPokeResults,
  resultsHTML,
  setResultsHTML
}) => {
  // let searchHTML;

  // Create the first 12 Pokémon result items if no search text has been entered
  // if (searchText === "") {
  //   searchHTML = fullPokeResults.slice(0, 12).map((resultItem, i) => {
  //     return <SearchItem resultItem={resultItem} key={i} />;
  //   });
  // }
  // // Otherwise, create the first 12 Pokémon with names or numbers containing the search text
  // else {
  //   searchHTML = fullPokeResults
  //     .filter(
  //       (res, i) =>
  //         res.name.includes(`${searchText.toLowerCase()}`) ||
  //         (i + Number(1)).toString().includes(`${searchText}`)
  //     )
  //     .slice(0, 12)
  //     .map((resultItem, i) => {
  //       return <SearchItem resultItem={resultItem} key={i} />;
  //     });
  // }

  useEffect(() => {
    console.log("Setting results")
    if (searchText === "") {
      setResultsHTML(fullPokeResults.slice(0, 12).map((resultItem, i) => {
        return <SearchItem resultItem={resultItem} key={i} />;
      }));
    }
    // Otherwise, create the first 12 Pokémon with names or numbers containing the search text
    else {
      setResultsHTML(fullPokeResults
        .filter(
          (res, i) =>
            res.name.includes(`${searchText.toLowerCase()}`) ||
            (i + Number(1)).toString().includes(`${searchText}`)
        )
        .slice(0, 12)
        .map((resultItem, i) => {
          return <SearchItem resultItem={resultItem} key={i} />;
        }));
    }
  }, [fullPokeResults, searchText, setResultsHTML])

  // Display if there are no Pokémon given the current search filter
  if (resultsHTML.length === 0) {
    resultsHTML = <div className="search-results-item">No Pokémon Found</div>;
  }

  return (
    <div
      className={`search-results ${
        searchBarFocus ? "search-results-active" : ""
      }`}
    >
      {resultsHTML}
    </div>
  );
};

export default SearchResults;

import React, { useEffect } from "react";
import SearchItem from "./SearchItem";

// Display the dropdown search results from the search bar
const SearchResults = ({
  searchText,
  searchBarFocus,
  fullPokeResults,
  resultsHTML,
  setResultsHTML,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const searchResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const searchResultsItemsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";

  // Scroll back to the top of the search results when closing the search results dropdown
  const searchDropdownRef = React.createRef();

  useEffect(() => {
    searchDropdownRef.current.scrollTop = 0;
  }, [searchDropdownRef]);

  // Create search results for the first 12 Pokémon based off number, starting at 1, if no search text has been entered
  useEffect(() => {
    if (searchText === "") {
      setResultsHTML(
        fullPokeResults.slice(0, 12).map((resultItem, i) => {
          return (
            <SearchItem
              resultItem={resultItem}
              isDarkMode={isDarkMode}
              key={i}
            />
          );
        })
      );
    }
    // Otherwise, create the first 12 Pokémon with names or numbers containing the search text
    else {
      setResultsHTML(
        fullPokeResults
          .filter(
            (res, i) =>
              res.name.includes(`${searchText.toLowerCase()}`) ||
              (i + Number(1)).toString().includes(`${searchText}`)
          )
          .slice(0, 12)
          .map((resultItem, i) => {
            return (
              <SearchItem
                resultItem={resultItem}
                isDarkMode={isDarkMode}
                key={i}
              />
            );
          })
      );
    }
  }, [fullPokeResults, searchText, setResultsHTML, isDarkMode]);

  // Display if there are no Pokémon given the current search filter
  if (resultsHTML.length === 0) {
    resultsHTML = (
      <div className={`search-results-item ${searchResultsItemsStyle}`}>
        No Pokémon Found
      </div>
    );
  }

  return (
    <div
      className={`search-results ${searchResultsStyle} ${
        searchBarFocus ? "search-results-active" : ""
      }`}
      ref={searchDropdownRef}
    >
      {resultsHTML}
    </div>
  );
};

export default SearchResults;

import React, { useEffect } from "react";
import SearchItem from "./SearchItem";
import SearchItemType from "./SearchItemType";

// Display the dropdown search results from the search bar
const SearchResults = ({
  searchText,
  searchBarFocus,
  fullPokeResults,
  typesResults,
  pokeResultsHTML,
  setPokeResultsHTML,
  typesResultsHTML,
  setTypesResultsHTML,
  isDarkMode,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const searchResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const searchResultsItemsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";
  const resultLabelStyle = isDarkMode
    ? "stats-progress-dark-min font-dark"
    : "stats-progress-light-min font-light";

  // Scroll back to the top of the search results when closing the search results dropdown
  const searchDropdownRef = React.createRef();

  useEffect(() => {
    searchDropdownRef.current.scrollTop = 0;
  }, [searchDropdownRef]);

  // Create search results for the first 12 Pokémon based off number, starting at 1, if no search text has been entered
  useEffect(() => {
    if (searchText === "") {
      setPokeResultsHTML(
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
      setPokeResultsHTML(
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
  }, [fullPokeResults, searchText, setPokeResultsHTML, isDarkMode]);

  useEffect(() => {
    if (pokeResultsHTML.length <= 12) {
      setTypesResultsHTML(
        typesResults
          .filter(
            (res, i) =>
              res.name.includes(`${searchText.toLowerCase()}`) ||
              (i + Number(1)).toString().includes(`${searchText}`)
          )
          .slice(0, 12 - pokeResultsHTML.length)
          .map((resultItem, i) => {
            return (
              <SearchItemType
                resultItem={resultItem}
                typeID={resultItem.id}
                isDarkMode={isDarkMode}
                key={i}
              />
            );
          })
      );
    }
  }, [
    typesResults,
    pokeResultsHTML.length,
    searchText,
    setTypesResultsHTML,
    isDarkMode,
  ]);

  // Display if there are no Pokémon given the current search filter
  if (pokeResultsHTML.length === 0 && typesResultsHTML.length === 0) {
    pokeResultsHTML = (
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
      {pokeResultsHTML.length > 0 && (
        <div className={`search-results-label ${resultLabelStyle}`}>
          Pokémon
        </div>
      )}
      {pokeResultsHTML}
      {typesResultsHTML.length > 0 && (
        <div className={`search-results-label ${resultLabelStyle}`}>Types</div>
      )}
      {typesResultsHTML}
    </div>
  );
};

export default SearchResults;

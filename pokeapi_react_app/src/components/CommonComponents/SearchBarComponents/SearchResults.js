import React, { useEffect } from "react";
import SearchItem from "./SearchItem";
import SearchItemType from "./SearchItemType";

// Display the dropdown search results from the search bar
const SearchResults = ({
  searchText,
  setSearchText,
  activeSearchIndex,
  setActiveSearchIndex,
  searchDropdownRef,
  isActiveDropdown,
  setIsActiveDropdown,
  fullPokeResults,
  typesResults,
  pokeResultsHTML,
  setPokeResultsHTML,
  typesResultsHTML,
  setTypesResultsHTML,
  screenSize,
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

  // Create search results for the first 12 Pokémon based off number, starting at 1, if no search text has been entered
  useEffect(() => {
    if (searchText === "") {
      setPokeResultsHTML(
        fullPokeResults.slice(0, 12).map((resultItem, i) => {
          return (
            <SearchItem
              setSearchText={setSearchText}
              activeSearchIndex={activeSearchIndex}
              setActiveSearchIndex={setActiveSearchIndex}
              setIsActiveDropdown={setIsActiveDropdown}
              resultItem={resultItem}
              screenSize={screenSize}
              isDarkMode={isDarkMode}
              index={i}
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
                setSearchText={setSearchText}
                activeSearchIndex={activeSearchIndex}
                setActiveSearchIndex={setActiveSearchIndex}
                setIsActiveDropdown={setIsActiveDropdown}
                resultItem={resultItem}
                screenSize={screenSize}
                isDarkMode={isDarkMode}
                index={i}
                key={i}
              />
            );
          })
      );
    }
  }, [
    setSearchText,
    activeSearchIndex,
    setActiveSearchIndex,
    setIsActiveDropdown,
    fullPokeResults,
    searchText,
    setPokeResultsHTML,
    isDarkMode,
    screenSize,
  ]);

  // If there are less than 12 pokeresults, add in any type results given the current filter
  useEffect(() => {
    if (pokeResultsHTML.length <= 12) {
      setTypesResultsHTML(
        typesResults
          .filter(
            (res, i) =>
              (res.name.includes(`${searchText.toLowerCase()}`) ||
                (i + Number(1)).toString().includes(`${searchText}`)) &&
              res.name !== "stellar" &&
              res.name !== "unknown"
          )
          .slice(0, 12 - pokeResultsHTML.length)
          .map((resultItem, i) => {
            i += pokeResultsHTML.length;
            return (
              <SearchItemType
                setSearchText={setSearchText}
                activeSearchIndex={activeSearchIndex}
                setActiveSearchIndex={setActiveSearchIndex}
                setIsActiveDropdown={setIsActiveDropdown}
                resultItem={resultItem}
                typeID={resultItem.id}
                screenSize={screenSize}
                isDarkMode={isDarkMode}
                index={i}
                key={i}
              />
            );
          })
      );
    }
  }, [
    setSearchText,
    activeSearchIndex,
    setActiveSearchIndex,
    setIsActiveDropdown,
    typesResults,
    pokeResultsHTML.length,
    searchText,
    setTypesResultsHTML,
    isDarkMode,
    screenSize,
  ]);

  // Automatically scroll to active item if it is out of view
  useEffect(() => {
    const dropdown = searchDropdownRef.current;
    const activeItem = dropdown?.children[activeSearchIndex + 1];

    if (activeItem) {
      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.clientHeight;
      const dropdownTop = dropdown.scrollTop;
      const dropdownHeight = dropdown.clientHeight;

      // Buffer to keep top label visible
      const topBuffer = itemHeight / 2;
      // Buffer space when encountering types label
      const additionalBuffer =
        activeSearchIndex === pokeResultsHTML.length ? 2 * itemHeight : 0;
      const totalBufferSpace = topBuffer + additionalBuffer;

      // Handle scrolling up
      if (itemTop - dropdownTop - totalBufferSpace < 0) {
        dropdown.scrollTop = itemTop - totalBufferSpace;
      }
      // Handle scrolling down
      else if (
        itemTop + itemHeight - dropdownTop - dropdownHeight + additionalBuffer >
        0
      ) {
        dropdown.scrollTop =
          itemTop + itemHeight - dropdownHeight + additionalBuffer;
      }
    }
  }, [searchDropdownRef, activeSearchIndex, pokeResultsHTML.length]);

  // Display if there are no Pokémon given the current search filter
  if (pokeResultsHTML.length === 0 && typesResultsHTML.length === 0) {
    pokeResultsHTML = (
      <div className={`search-results-item ${searchResultsItemsStyle}`}>
        No Pokémon Found
      </div>
    );
  }

  // Otherwise, display the first 12 results of Pokémon and types
  return (
    <div
      className={`search-results ${searchResultsStyle} ${
        isActiveDropdown ? "search-results-active" : ""
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

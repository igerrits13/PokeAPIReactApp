import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({ typesResults, fullPokeResults, isDarkMode }) => {
  // Variables for checking the text being searched, if the search bar should be active and the search results
  const [searchText, setSearchText] = useState("");
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [pokeResultsHTML, setPokeResultsHTML] = useState([]);
  const [typesResultsHTML, setTypesResultsHTML] = useState([]);
  const navigate = useNavigate();

  // Ref to keep track of where the cursor is within the input search box
  const inputRef = useRef(null);

  // Setup the search bar style based on if the user is using light or dark mode
  const searchFontStyle = isDarkMode
    ? "searchbar-font-dark component-background-dark component-outline-dark"
    : "searchbar-font-light component-background-light component-outline-light";
  const searchIconStyle = isDarkMode
    ? "icon-dark component-outline-background-dark"
    : "icon-light component-outline-background-light";

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
    handleOnFocus();
  };

  // Clear the search text
  const clearSearchText = () => {
    setSearchText("");
  };

  // Update state for when the search bar is being focused
  const handleOnFocus = () => {
    setSearchBarFocus(true);
  };

  const handleOnBlur = () => {
    // Create a small delay to allow for a search result item link to work if one is clicked
    setTimeout(() => {
      setSearchBarFocus(false);
      clearSearchText();
    }, 150);
  };

  // Automatically fill the search text based on key pressed
  const autoFillSearchText = (e) => {
    // When 'Tab' is pressed, autofill search text with the next filtered Pokémon
    if (e.key === "Tab") {
      e.preventDefault();
      if (pokeResultsHTML.length > 0) {
        setSearchText(pokeResultsHTML[0].props.resultItem.name);
      }
    }
    // When 'Enter' is pressed, search for the current text or ID of the Pokémon if it exists
    if (e.key === "Enter") {
      if (pokeResultsHTML.length > 0) {
        console.log(pokeResultsHTML[0]);
        const urlArr = pokeResultsHTML[0].props.resultItem.url.split("/");
        const urlNoSlash = urlArr.filter((part) => part !== "");
        const urlNumber = urlNoSlash[urlNoSlash.length - 1];
        const pokeNum = parseInt(urlNumber, 10);
        navigate(`/pokemon/${pokeNum}`);
        clearSearchText();
      } else if (typesResultsHTML.length > 0) {
        navigate(`/types/${typesResultsHTML[0].props.resultItem.name}`);
        clearSearchText();
      } else {
        navigate(`/pokemon/${searchText}`);
        clearSearchText();
      }
      handleOnBlur();
    }
    // if (e.key === "ArrowDown") {
    //   if (resultsHTML.length > 0) {
    //     setSearchText(resultsHTML[0].props.resultItem.name);
    //     if (inputRef.current) {
    //       const input = inputRef.current;
    //       input.setSelectionRange(searchText.length, searchText.length);
    //     }
    //   }
    // }
    // if (e.key === "ArrowUp") {
    //   if (resultsHTML.length > 0) {
    //     setSearchText(
    //       resultsHTML[resultsHTML.length - 1].props.resultItem.name
    //     );
    //     if (inputRef.current) {
    //       const input = inputRef.current;
    //       input.setSelectionRange(searchText.length, searchText.length);
    //     }
    //   }
    // }
  };

  // Display the search bar with pop-up search results
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className={`searchbar-input ${searchFontStyle}`}
        placeholder="Search Pokémon . . ."
        aria-label="Search Pokémon"
        value={searchText}
        onChange={updateSearchText}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={autoFillSearchText}
        ref={inputRef}
      />
      {/* <Link to="/pokemon/"> */}
      <Link to={`/pokemon/${searchText}`}>
        <button
          className={`searchbar-search-icon ${searchIconStyle}`}
          onClick={() => clearSearchText()}
        >
          <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>{" "}
        </button>
      </Link>
      <SearchResults
        searchText={searchText}
        searchBarFocus={searchBarFocus}
        fullPokeResults={fullPokeResults}
        typesResults={typesResults}
        pokeResultsHTML={pokeResultsHTML}
        setPokeResultsHTML={setPokeResultsHTML}
        typesResultsHTML={typesResultsHTML}
        setTypesResultsHTML={setTypesResultsHTML}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SearchBar;

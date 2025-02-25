import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({ typesResults, fullPokeResults, isDarkMode }) => {
  // Variables for checking the text being searched and the search results
  const [searchText, setSearchText] = useState("");
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const [pokeResultsHTML, setPokeResultsHTML] = useState([]);
  const [typesResultsHTML, setTypesResultsHTML] = useState([]);
  const navigate = useNavigate();

  // Ref to keep track of where the cursor is within the input search box
  const inputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  // Setup the search bar style based on if the user is using light or dark mode
  const searchFontStyle = isDarkMode
    ? "searchbar-font-dark component-background-dark component-outline-dark"
    : "searchbar-font-light component-background-light component-outline-light";
  const searchIconStyle = isDarkMode
    ? "icon-dark component-outline-background-dark"
    : "icon-light component-outline-background-light";

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        searchDropdownRef.current.scrollTop = 0;
        setSearchText("");
        setIsActiveDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Update the text in the search bar
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  // Clear the search text
  const clearSearchText = () => {
    setSearchText("");
  };

  // Automatically fill the search text based on key pressed
  const autoFillSearchText = (e) => {
    // When 'Tab' is pressed, autofill search text with the next filtered Pokémon
    if (e.key === "Tab") {
      e.preventDefault();
      if (pokeResultsHTML.length > 0) {
        setSearchText(pokeResultsHTML[0].props.resultItem.name);
      } else if (typesResultsHTML.length > 0) {
        setSearchText(typesResultsHTML[0].props.resultItem.name);
      }
    }
    // When 'Enter' is pressed, search for the current text or ID of the Pokémon if it exists
    if (e.key === "Enter") {
      if (pokeResultsHTML.length > 0) {
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
        onClick={() => setIsActiveDropdown(true)}
        onChange={updateSearchText}
        onKeyDown={autoFillSearchText}
        ref={inputRef}
      />
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
        searchDropdownRef={searchDropdownRef}
        isActiveDropdown={isActiveDropdown}
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

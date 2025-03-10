import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";

// Search bar for searching Pokémon
const SearchBar = ({
  typesResults,
  fullPokeResults,
  screenSize,
  isDarkMode,
}) => {
  // Variables for checking the text being searched and the search results
  const [searchText, setSearchText] = useState("");
  const [activeSearchIndex, setActiveSearchIndex] = useState(0);
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

  const resetSearchBar = () => {
    searchDropdownRef.current.scrollTop = 0;
    setSearchText("");
    setIsActiveDropdown(false);
    setActiveSearchIndex(0);
  };

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        resetSearchBar();
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

  // Automatically fill the search text based on key pressed
  const autoFillSearchText = (e) => {
    // When 'Tab' is pressed, autofill search text with the next filtered Pokémon
    if (e.key === "Tab") {
      e.preventDefault();
      if (activeSearchIndex < pokeResultsHTML.length) {
        setSearchText(pokeResultsHTML[activeSearchIndex].props.resultItem.name);
      } else if (
        activeSearchIndex <
        pokeResultsHTML.length + typesResultsHTML.length
      ) {
        setSearchText(
          typesResultsHTML[activeSearchIndex - pokeResultsHTML.length].props
            .resultItem.name
        );
      }
      setActiveSearchIndex(0);
    }
    // When 'Enter' is pressed, search for the current text or ID of the Pokémon if it exists
    if (e.key === "Enter") {
      if (pokeResultsHTML.length > activeSearchIndex) {
        const urlArr =
          pokeResultsHTML[activeSearchIndex].props.resultItem.url.split("/");
        const urlNoSlash = urlArr.filter((part) => part !== "");
        const urlNumber = urlNoSlash[urlNoSlash.length - 1];
        const pokeNum = parseInt(urlNumber, 10);
        resetSearchBar();
        navigate(`/pokemon/${pokeNum}`);
      } else if (typesResultsHTML.length > 0) {
        resetSearchBar();
        navigate(
          `/types/${
            typesResultsHTML[activeSearchIndex - pokeResultsHTML.length].props
              .resultItem.name
          }`
        );
      } else {
        resetSearchBar();
        navigate(`/pokemon/${searchText}`);
      }
    }
    // Disable arrow keys for small screens
    if (screenSize === "small") {
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (
        activeSearchIndex + 1 >=
        pokeResultsHTML.length + typesResultsHTML.length
      ) {
        setActiveSearchIndex(0);
      } else {
        setActiveSearchIndex(activeSearchIndex + 1);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        activeSearchIndex - 1 < 0 ||
        activeSearchIndex - 1 > pokeResultsHTML.length
      ) {
        setActiveSearchIndex(
          pokeResultsHTML.length + typesResultsHTML.length - 1
        );
      } else {
        setActiveSearchIndex(activeSearchIndex - 1);
      }
    }
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
          onClick={() => resetSearchBar()}
        >
          <i className="fa-solid fa-magnifying-glass searchbar-icon"></i>{" "}
        </button>
      </Link>
      <SearchResults
        searchText={searchText}
        setSearchText={setSearchText}
        activeSearchIndex={activeSearchIndex}
        setActiveSearchIndex={setActiveSearchIndex}
        searchDropdownRef={searchDropdownRef}
        isActiveDropdown={isActiveDropdown}
        setIsActiveDropdown={setIsActiveDropdown}
        fullPokeResults={fullPokeResults}
        typesResults={typesResults}
        pokeResultsHTML={pokeResultsHTML}
        setPokeResultsHTML={setPokeResultsHTML}
        typesResultsHTML={typesResultsHTML}
        setTypesResultsHTML={setTypesResultsHTML}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default SearchBar;

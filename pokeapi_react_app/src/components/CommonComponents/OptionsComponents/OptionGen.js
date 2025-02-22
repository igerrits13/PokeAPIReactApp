import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import OptionFilterItem from "./OptionFilterItem";

// Handles the logic for filtering Pokémon by gen
const OptionGen = ({ filterByGen, setFilterByGen, isDarkMode }) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  // Variable to store all possible gens that can be selected
  const [genResults, setGenResults] = useState([]);
  const [isFilteredBy, setIsFilteredBy] = useState([]);
  const [isActiveFilterDropdown, setIsActiveFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);
  const filterButtonRef = useRef(null);

  // Fetch the generations
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation/?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        setGenResults(data.results);
      });
  }, []);

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        filterDropdownRef.current.scrollTop = 0;
        setIsActiveFilterDropdown(false);
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  const getGenNum = (genURL) => {
    // Seperate out the integer from the url
    const urlArr = genURL.split("/");
    const urlNoSlash = urlArr.filter((part) => part !== "");
    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
    return parseInt(urlNumber, 10);
  };

  // Create the view of the filter dropdown
  return (
    <div className={`option-sort-dropdown-container ${fontStyle}`}>
      <div className="option-sort-dropdown-item">
        Filter By Generation:
        <button
          className={`option-sort-dropdown-button ${fontStyle} ${optionStyle}`}
          onClick={() => setIsActiveFilterDropdown(!isActiveFilterDropdown)}
          ref={filterButtonRef}
        >
          <div>{isFilteredBy.length === 0 ? "All" : isFilteredBy[0]}</div>
          <motion.i
            className="fa-solid fa-circle-chevron-down"
            animate={{
              rotate: isActiveFilterDropdown ? -180 : 0,
            }}
            transition={{ duration: 0.2 }}
          ></motion.i>
        </button>
      </div>
      <div
        className={`option-sort-dropdown-results ${optionStyle} ${
          isActiveFilterDropdown ? "option-sort-dropdown-results-active" : ""
        }`}
        ref={filterDropdownRef}
      >
        {genResults.map((filter) => {
          return (
            <React.Fragment key={filter.name}>
              <OptionFilterItem
                filterType={"gen"}
                filter={getGenerationTitle(filter.name)}
                filterNum={getGenNum(filter.url)}
                filterByGen={filterByGen}
                setFilterByGen={setFilterByGen}
                isFilteredBy={isFilteredBy}
                setIsFilteredBy={setIsFilteredBy}
                isDarkMode={isDarkMode}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OptionGen;

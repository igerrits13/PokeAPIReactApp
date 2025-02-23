import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import OptionFilterItem from "./OptionFilterItem";

// Displays the options for filtering by type
const OptionType = ({
  filterByType,
  setFilterByType,
  typesResults,
  isDarkMode,
}) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  // const [typeResults, setTypeResults] = useState([]);
  const [isFilteredBy, setIsFilteredBy] = useState([]);
  const [isActiveFilterDropdown, setIsActiveFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);
  const filterButtonRef = useRef(null);

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
  const getTypeTitle = (type) => {
    return type[0].toUpperCase() + type.slice(1);
  };

  // Get the number of the current type
  const getTypeNum = (genURL) => {
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
        Filter By Type:
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
        {typesResults.slice(0, typesResults.length - 2).map((filter) => {
          return (
            <React.Fragment key={filter.name}>
              <OptionFilterItem
                filter={getTypeTitle(filter.name)}
                filterNum={getTypeNum(filter.url)}
                filterBy={filterByType}
                setFilterBy={setFilterByType}
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

export default OptionType;

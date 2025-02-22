import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import OptionSortItem from "./OptionSortItem";

// Handles the logic for sorting Pokémon by name or number
const OptionSort = ({ setSortBy, isDarkMode }) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  // Create state and refs to track when the sort options dropdown should be displayed
  const [isSortedBy, setIsSortedBy] = useState("Number");
  const [isActiveSortDropdown, setIsActiveSortDropdown] = useState(false);
  const sortDropdownRef = useRef(null);
  const sortButtonRef = useRef(null);

  // Mapping for possible sort otpions
  const sortOptions = ["Number", "Name"];

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        sortDropdownRef.current.scrollTop = 0;
        setIsActiveSortDropdown(false);
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Display the sort options button and dropdown
  return (
    <div className={`option-sort-dropdown-container ${fontStyle}`}>
      <div className="option-sort-dropdown-item">
        Sort By:
        <button
          className={`option-sort-dropdown-button ${fontStyle} ${optionStyle}`}
          onClick={() => setIsActiveSortDropdown(!isActiveSortDropdown)}
          ref={sortButtonRef}
        >
          <div>{isSortedBy}</div>
          <motion.i
            className="fa-solid fa-circle-chevron-down"
            animate={{
              rotate: isActiveSortDropdown ? -180 : 0,
            }}
            transition={{ duration: 0.2 }}
          ></motion.i>
        </button>
      </div>
      <div
        className={`option-sort-dropdown-results ${optionStyle} ${
          isActiveSortDropdown ? "option-sort-dropdown-results-active" : ""
        }`}
        ref={sortDropdownRef}
      >
        {sortOptions.map((method) => {
          return (
            <React.Fragment key={method}>
              <OptionSortItem
                method={method}
                isSortedBy={isSortedBy}
                setIsSortedBy={setIsSortedBy}
                setSortBy={setSortBy}
                isDarkMode={isDarkMode}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSort;

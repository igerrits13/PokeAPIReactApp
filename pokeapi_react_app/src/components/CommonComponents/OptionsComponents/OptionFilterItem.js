import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Dropdown items for the filter options
const OptionFilterItem = ({
  filter,
  filterNum,
  filterBy,
  setFilterBy,
  isFilteredBy,
  setIsFilteredBy,
  isDarkMode,
}) => {
  // Setup the filter item style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

  // Create state to track when the item is being hovered and when filter is applied
  const [isHovered, setIsHovered] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  // Handle user actions applied to the button
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // If filters have been reset, clear all check boxes and isFilteredBy array to display "All"
  useEffect(() => {
    if (filterBy[0] === "all") {
      setIsFiltered(false);
      setIsFilteredBy([]);
    }
  }, [filterBy, setIsFiltered, setIsFilteredBy]);

  // Update the displayed Pokémon based on what filter has been selected or deselected
  const updateFilter = () => {
    setIsFiltered(!isFiltered);
    if (isFiltered) {
      setIsFilteredBy((prevState) =>
        prevState.filter((currFilter) => currFilter !== filter)
      );
      if (isFilteredBy.length - 1 === 0) {
        setFilterBy(["all"]);
      } else {
        setFilterBy((prevState) =>
          prevState.filter((currFilter) => currFilter !== filterNum)
        );
      }
    } else {
      if (filterBy[0] === "all")
        setFilterBy((prevState) =>
          prevState.filter((currFilter) => currFilter !== "all")
        );
      setFilterBy((existingFilters) => [...existingFilters, filterNum]);
      setIsFilteredBy((existingFilters) => [...existingFilters, filter]);
    }
  };

  // Display the current filter option item
  return (
    <button
      className={`option-sort-dropdown-result-item ${fontStyle} ${optionStyle}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => updateFilter()}
    >
      {filter}
      <motion.i
        className={`${
          isFiltered ? "fa-solid fa-square-check" : "fa-regular fa-square"
        }`}
        animate={{
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </button>
  );
};

export default OptionFilterItem;

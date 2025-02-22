import { useState } from "react";
import { motion } from "motion/react";

// Dropdown items for the filter options
const OptionFilterItem = ({
  filter,
  filterNum,
  setFilterByGen,
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

  // Update the current gen based on what value has been selected or deselected
  const updateGen = () => {
    setIsFiltered(!isFiltered);
    if (isFiltered) {
      setFilterByGen("all");
      setIsFilteredBy((prevState) =>
        prevState.filter((currFilter) => currFilter !== filter)
      );
    } else {
      setFilterByGen(filterNum);
      setIsFilteredBy((existingFilters) => [...existingFilters, filter]);
    }
  };

  // Display the current filter option item
  return (
    <button
      className={`option-sort-dropdown-result-item ${fontStyle} ${optionStyle}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => updateGen(filter)}
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

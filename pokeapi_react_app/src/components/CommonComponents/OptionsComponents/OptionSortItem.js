import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Dropdown items for the sort options
const OptionSortItem = ({
  method,
  isSortedBy,
  setIsSortedBy,
  sortBy,
  setSortBy,
  isDarkMode,
}) => {
  // Setup the sort item style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "component-background-dark component-outline-dark-no-side"
    : "component-background-light component-outline-light-no-side";

  // Create state to track when the item is being hovered
  const [isHovered, setIsHovered] = useState(false);

  // Handle user actions applied to the button
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // If reset is pressed, sort by number
  useEffect(() => {
    if (sortBy === "number") {
      setIsSortedBy("Number");
    }
  }, [sortBy, setIsSortedBy]);

  // Update the current sort method based on what value has been selected
  const updateSort = (sortMethod) => {
    setIsSortedBy(sortMethod);
    setSortBy(sortMethod.toLowerCase());
  };

  // Display the current sort option item
  return (
    <button
      className={`option-sort-dropdown-result-item ${fontStyle} ${optionStyle}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => updateSort(method)}
    >
      {method}
      <motion.i
        className={`${
          isSortedBy === method
            ? "fa-solid fa-square-check"
            : "fa-regular fa-square"
        }`}
        animate={{
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </button>
  );
};

export default OptionSortItem;

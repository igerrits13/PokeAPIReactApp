import { motion } from "motion/react";

// Handles the logic for filtering Pokémon by gen
const ResetOptions = ({
  setFilterOptions,
  setSortOptions,
  screenSize,
  isDarkMode,
}) => {
  // Setup the sort options style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const optionStyle = isDarkMode
    ? "stats-progress-dark-min component-outline-dark"
    : "stats-progress-light-min component-outline-light";

  // Set filter options to "all" and sort to "number"
  const resetFilters = () => {
    Object.entries(setFilterOptions).forEach((setOption) =>
      setOption[1](["all"])
    );
    setSortOptions("number");
  };

  // Create the view of the filter dropdown
  return (
    <motion.button
      className={`option-sort-dropdown-button 
        ${screenSize !== "small" ? "option-sort-reset-button" : ""}
       ${fontStyle} ${optionStyle}`}
      onClick={() => resetFilters()}
      whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
      whileTap={{ scale: 0.9, rotate: "5deg" }}
      transition={{ duration: 0.1 }}
    >
      Reset Filters
    </motion.button>
  );
};

export default ResetOptions;

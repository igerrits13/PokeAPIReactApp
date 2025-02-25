import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Common section to display icons
const SpriteTableSection = ({
  spritePage,
  sectionDescription,
  sectionHTML,
  index,
  totalIndices,
  isExpanded,
  setIsExpanded,
  isDarkMode,
}) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";
  const spriteSectiondetailStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";

  // Set all but the first section to be collapsed on load
  const [isActiveIconsDropdown, setIsActiveIconsDropdown] = useState(() => {
    return index === 0 || spritePage === "types" ? true : false;
  });

  // If the user selects to expand or collapse all sections, update appropriately
  useEffect(() => {
    if (isExpanded !== null) {
      isExpanded
        ? setIsActiveIconsDropdown(true)
        : setIsActiveIconsDropdown(false);
    }
  }, [isExpanded, setIsActiveIconsDropdown]);

  // Update the current section to be showing or not and reset isExpanded to null to keep the state of all
  // sections accurate
  const handleDropdown = () => {
    setIsActiveIconsDropdown(!isActiveIconsDropdown);
    setIsExpanded(null);
  };

  // Display the current icon table section
  return (
    <div
      className={`sprites-table-game ${
        isActiveIconsDropdown ? "sprites-table-game-active" : ""
      } ${spriteSectionStyle} ${fontStyle}`}
    >
      <div
        className={`sprites-table-game-title ${
          isActiveIconsDropdown
            ? "sprites-table-game-title-top"
            : totalIndices === 0
            ? "sprites-table-game-title-single"
            : index === 0
            ? "sprites-table-game-title-top"
            : index === totalIndices
            ? "sprites-table-game-title-bottom"
            : ""
        } ${spriteSectiondetailStyle}`}
        onClick={handleDropdown}
      >
        <div className="sprites-table-game-title-text">
          {sectionDescription}
        </div>
        <motion.i
          className="fa-solid fa-circle-chevron-down sprites-table-game-title-icon"
          animate={{
            rotate:
              isExpanded === null
                ? !isActiveIconsDropdown
                  ? -180
                  : 0
                : isExpanded
                ? 0
                : -180,
          }}
          transition={{ duration: 0.2 }}
        ></motion.i>
      </div>
      <div
        className="spritestab-icon-container"
        style={{
          display:
            isExpanded === null
              ? isActiveIconsDropdown
                ? "flex"
                : "none"
              : isExpanded
              ? "flex"
              : "none",
        }}
      >
        {sectionHTML}
      </div>
    </div>
  );
};

export default SpriteTableSection;

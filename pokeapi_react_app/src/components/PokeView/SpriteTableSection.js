import { useState } from "react";
import { motion } from "motion/react";

// Common section to display icons
const SpriteTableSection = ({
  sectionDescription,
  sectionHTML,
  index,
  isDarkMode,
}) => {
  // Setup the sprites section style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";
  const spriteSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";

  const [isActiveIconsDropdown, setIsActiveIconsDropdown] = useState(() => {
    return index === 0 ? true : false;
  });

  return (
    <div className={`sprites-table-game ${spriteSectionStyle} ${fontStyle}`}>
      <div
        className="sprites-table-game-title"
        onClick={() => setIsActiveIconsDropdown(!isActiveIconsDropdown)}
      >
        <div className="sprites-table-game-title-text">
          {sectionDescription}
        </div>
        <motion.i
          className="fa-solid fa-circle-chevron-down sprites-table-game-title-icon"
          animate={{
            rotate: !isActiveIconsDropdown ? -180 : 0,
          }}
          transition={{ duration: 0.2 }}
        ></motion.i>
      </div>
      <div
        className="spritestab-icon-container"
        style={{ display: isActiveIconsDropdown ? "flex" : "none" }}
      >
        {sectionHTML}
      </div>
    </div>
  );
};

export default SpriteTableSection;

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";

// Create a table section based on the input array of information
const DynamicTableSectionIcons = ({
  sectionInfo,
  typeData,
  isTypesLoading,
  getTypeIcon,
  screenSize,
  isDarkMode,
}) => {
  // Setup the icon, line and button styling for information sections based on if the user is using light or dark mode
  const iconStyle = isDarkMode
    ? "component-background-dark component-rounded-outline-thin-dark"
    : "component-background-light component-rounded-outline-thin-light";
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";
  const buttonSize =
    screenSize === "small"
      ? "typeview-info-icon-small"
      : screenSize === "med"
      ? "typeview-info-icon-med"
      : "typeview-info-icon-large";

  // Return the name of the current game in formatted form
  const getSectionTitle = (section) => {
    return section
      .split("_")
      .map(
        (currWord) =>
          currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase()
      )
      .join(" ");
  };

  // Display the section based on the input array. Add lines between items, but not after the last item
  return (
    <>
      {!isTypesLoading &&
        Object.entries(typeData.damage_relations).map(([obj, icons], i) => {
          if (icons.length > 0) {
            return (
              <div
                key={i}
                className={`table-info-section ${
                  i < Object.entries(typeData.damage_relations).length - 1
                    ? lineStyle
                    : ""
                }`}
              >
                <div className="typeview-info-name">{getSectionTitle(obj)}</div>
                <div className="typeview-info-icon-container">
                  {Object.entries(icons).map((icon, i) => {
                    const [currTypeIcon, currTypeStyle] = getTypeIcon(
                      icon[1].name
                    );
                    // Get the id for the current type to add to the Link
                    const urlArr = icon[1].url.split("/");
                    const urlNoSlash = urlArr.filter((part) => part !== "");
                    const urlNumber = urlNoSlash[urlNoSlash.length - 1];
                    const typeNum = parseInt(urlNumber, 10);
                    const typeIdUrl = `/types/${typeNum}`;
                    return (
                      <Link key={i} className="clean-text" to={typeIdUrl}>
                        <motion.button
                          className={`hover-dim ${
                            screenSize === "small"
                              ? "typeview-info-button-small"
                              : "typeview-info-button-med-large"
                          } ${iconStyle}`}
                          whileHover={{ scale: 1.1, rotate: "-5deg" }}
                          whileTap={{ scale: 0.9, rotate: "5deg" }}
                          transition={{ duration: 0.1 }}
                        >
                          <DynamicSvgIcon
                            classes={`${buttonSize} ${currTypeStyle}`}
                            IconComponent={currTypeIcon}
                          />
                        </motion.button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className={`table-info-section ${
                  i < Object.entries(typeData.damage_relations).length - 1
                    ? lineStyle
                    : ""
                }`}
              >
                <div className="typeview-info-name">{getSectionTitle(obj)}</div>
                <div className="typeview-info-icon-container">None</div>
              </div>
            );
          }
        })}
    </>
  );
};

export default DynamicTableSectionIcons;

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import DynamicSvgIcon from "../../CommonComponents/DynamicComponents/DynamicSvgIcon";

// Display for each type base on screen size
const TypesResultsItem = ({
  obj,
  typeIcon,
  typeStyle,
  isDisabled,
  isDarkMode,
}) => {
  // Setup the type results and text style based on if the user is using light or dark mode
  const typeResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const typeResultsFontStyle = isDarkMode
    ? "font-dark-no-outline"
    : "font-light";

  // Get the id for the current type to add to the Link
  const urlArr = obj.url.split("/");
  const urlNoSlash = urlArr.filter((part) => part !== "");
  const urlNumber = urlNoSlash[urlNoSlash.length - 1];
  const typeNum = parseInt(urlNumber, 10);
  const typeIdUrl = `/types/${typeNum}`;

  return (
    <Link
      className="clean-text"
      to={typeIdUrl}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
    >
      <motion.button
        className={`type-item hover-dim ${typeResultsStyle}`}
        whileHover={{ scale: 1.1, rotate: "-1.5deg" }}
        whileTap={{ scale: 0.9, rotate: "5deg" }}
        transition={{ duration: 0.1 }}
      >
        <DynamicSvgIcon
          classes={`type-img ${typeStyle}`}
          IconComponent={typeIcon}
        />
        <div className={`type-text ${typeResultsFontStyle}`}>
          {obj.name.toUpperCase()}
        </div>
      </motion.button>
    </Link>
  );
};

export default TypesResultsItem;

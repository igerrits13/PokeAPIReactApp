import { motion } from "motion/react";
import DynamicSvgIcon from "./DynamicSvgIcon";

const TypesResultsItem = ({ obj, typeIcon, typeStyle, isDarkMode }) => {
    // Setup the type results and text style based on if the user is using light or dark mode
    const typeResultsStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";

    const typeResultsFontStyle = isDarkMode 
    ? "font-dark-no-outline" : "font-light";

  return (
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
      <div className={`type-text ${typeResultsFontStyle}`}>{obj.name.toUpperCase()}</div>
    </motion.button>
  );
};

export default TypesResultsItem;
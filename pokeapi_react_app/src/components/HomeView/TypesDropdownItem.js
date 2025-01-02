import { Link } from "react-router-dom";
import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";

// Dropdown displaying types for smaller screens
const TypesDropdownItem = ({ obj, typeIcon, typeStyle, isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const typesDropdownItemStyle = isDarkMode
    ? "font-dark component-background-dark"
    : "font-light component-background-light";

  return (
    <Link
      to="./"
      className={`types-dropdown-item hover-dim ${typesDropdownItemStyle}`}
    >
      <DynamicSvgIcon
        classes={`types-dropdown-img ${typeStyle}`}
        IconComponent={typeIcon}
      />
      {obj.name.toUpperCase()}
    </Link>
  );
};

export default TypesDropdownItem;

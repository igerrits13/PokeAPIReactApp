import { Link } from "react-router-dom";
import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";

// Dropdown displaying types for smaller screens
const TypesDropdownItem = ({ obj, typeIcon, typeStyle, isDarkMode }) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const typesDropdownItemStyle = isDarkMode
    ? "font-dark component-background-dark"
    : "font-light component-background-light";

  // Get the id for the current type to add to the Link
  const urlArr = obj.url.split("/");
  const urlNoSlash = urlArr.filter((part) => part !== "");
  const urlNumber = urlNoSlash[urlNoSlash.length - 1];
  const typeNum = parseInt(urlNumber, 10);
  const typeIdUrl = `/types/${typeNum}`;

  return (
    <Link
      to={typeIdUrl}
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

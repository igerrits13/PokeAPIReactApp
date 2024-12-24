import { Link } from "react-router-dom";
import DynamicSvgIcon from "./DynamicSvgIcon";

const TypesDropdownItem = ({ obj, typeIcon, typeStyle }) => {
  return (
    <Link to="./" className="types-dropdown-item hover-dim">
      <DynamicSvgIcon
        classes={`types-dropdown-img ${typeStyle}`}
        IconComponent={typeIcon}
      />
      {obj.name.toUpperCase()}
    </Link>
  );
};

export default TypesDropdownItem;

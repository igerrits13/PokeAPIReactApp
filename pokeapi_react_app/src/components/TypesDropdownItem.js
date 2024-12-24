import { Link } from "react-router-dom";
import DynamicSvgIcon from "./DynamicSvgIcon";

const TypesDropdownItem = ({ obj, typeIcon, typeStyle }) => {
  return (
    <Link to="./" className="types-dropdown-item hover-dim">
      {/* <img
        className={`types-dropdown-img ${typeStyle}`}
        src={`${typeIcon}`}
        alt={`${obj.name} type icon`}
      /> */}
      <DynamicSvgIcon
        classes={`types-dropdown-img ${typeStyle}`}
        IconComponent={typeIcon}
      />
      {obj.name.toUpperCase()}
    </Link>
  );
};

export default TypesDropdownItem;

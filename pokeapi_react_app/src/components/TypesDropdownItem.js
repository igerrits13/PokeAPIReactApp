import { Link } from "react-router-dom";

const TypesDropdownItem = ({ obj, typeIcon, typeStyle }) => {
  return (
    <Link to="./" className="types-dropdown-item hover-dim">
      <img
        className={`types-dropdown-img ${typeStyle}`}
        src={`${typeIcon}`}
        alt={`${obj.name} type icon`}
      />
      {obj.name.toUpperCase()}
    </Link>
  );
};

export default TypesDropdownItem;

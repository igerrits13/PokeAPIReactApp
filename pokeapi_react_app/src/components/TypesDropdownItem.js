import { Link } from "react-router-dom";

const TypesDropdownItem = ({ obj, typeIcon, typeStyle }) => {
  return (
    <Link to="./" className={`types-dropdown-item hover-dim ${typeStyle}`}>
      <img
        className="types-dropdown-img"
        src={`${typeIcon}`}
        alt={`${obj.name} type icon`}
      />
      {obj.name.toUpperCase()}
    </Link>
  );
};

export default TypesDropdownItem;

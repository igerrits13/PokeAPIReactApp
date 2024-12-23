// import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TypesDropdownItem from "./TypesDropdownItem";

const TypesDropdown = ({ typesResults, getTypeIcon }) => {
  const [typesButtonFocus, setTypesButtonFocus] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  //

  //

  const handleOnClick = () => {
    setTypesButtonFocus(!typesButtonFocus);
  };

  // Close dropdown if click is outside of the dropdown or button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setTypesButtonFocus(false); // Close dropdown if click is outside
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const handleOnBlur = () => {
  //   setTypesButtonFocus(!typesButtonFocus);
  // };

  const typesResultsHTML = typesResults
    .slice(0, typesResults.length - 2)
    .map((obj, i) => {
      const [typeIcon, typeStyle] = getTypeIcon(obj.name);
      return (
        <TypesDropdownItem
          key={i}
          obj={obj}
          typeIcon={typeIcon}
          typeStyle={typeStyle}
        />
      );
    });

  return (
    //  <div>{typesResultsHTML}</div>;
    <div>
      <div className="types-dropdown-container">
        <button
          className="types-dropdown-button"
          ref={buttonRef}
          onClick={handleOnClick}
        >
          Types
        </button>
      </div>
      {/* <div className="types-dropdown-content types-dropdown-content-active"> */}
      <div
        className={`types-dropdown-content ${
          typesButtonFocus ? "types-dropdown-content-active" : ""
        }`}
        ref={dropdownRef}
      >
        {typesResultsHTML}
      </div>
    </div>
  );
};

export default TypesDropdown;

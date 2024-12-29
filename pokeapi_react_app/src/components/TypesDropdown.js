import { useState, useEffect, useRef } from "react";
import TypesDropdownItem from "./TypesDropdownItem";

const TypesDropdown = ({ typesResults, getTypeIcon, isDarkMode }) => {
  const [typesButtonFocus, setTypesButtonFocus] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

    // Setup the search bar style based on if the user is using light or dark mode
    const typesDropdownButtonStyle = isDarkMode
    ? "font-dark component-background-dark component-outline-dark"
    : "font-light component-background-light component-outline-light";

        // Setup the search bar style based on if the user is using light or dark mode
        const typesDropdownContentStyle = isDarkMode
        ? "component-background-dark component-outline-dark"
        : "component-background-light component-outline-light";

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
          isDarkMode={isDarkMode}
        />
      );
    });

  return (
    <div>
      <div className="types-dropdown-container">
        <button
          className={`types-dropdown-button ${typesDropdownButtonStyle}`}
          ref={buttonRef}
          onClick={handleOnClick}
        >
          Types
        </button>
      </div>
      <div
        className={`types-dropdown-content ${typesDropdownContentStyle} ${
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

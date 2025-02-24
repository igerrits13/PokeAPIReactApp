import { useState, useEffect, useRef } from "react";

// Button to allow for the user to expand or collapse all sprite table sections
const CollapseExpandButton = ({ setIsExpanded, isDarkMode }) => {
  // Setup the icon style based on if the user is using light or dark mode
  const collapseExpandButtonStyle = isDarkMode
    ? "stats-progress-dark-min"
    : "stats-progress-light-min";
  const dropdownStyle = isDarkMode
    ? "component-background-dark component-outline-dark"
    : "component-background-light component-outline-light";
  const dropdownOptionsStyle = isDarkMode
    ? "component-background-dark font-dark"
    : "component-background-light font-light";

  // State and references to determine if the dropdown should be visible
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const CollapseExpandDropdownRef = useRef(null);
  const CollapseExpandButtonRef = useRef(null);

  // Close dropdown if user clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        CollapseExpandDropdownRef.current &&
        !CollapseExpandDropdownRef.current.contains(event.target) &&
        CollapseExpandButtonRef.current &&
        !CollapseExpandButtonRef.current.contains(event.target)
      ) {
        setIsActiveDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Update states to collapse all sections and close dropdown
  const handleCollapseButton = () => {
    setIsActiveDropdown(false);
    setIsExpanded(false);
  };

  // Update states to expand all sections and close dropdown
  const handleExpandButton = () => {
    setIsActiveDropdown(false);
    setIsExpanded(true);
  };

  // Display the collapse/expand button and dropdown
  return (
    <div className={`expand-collapse-conatainer ${collapseExpandButtonStyle}`}>
      <div
        className="expand-collapse-icon-container"
        ref={CollapseExpandButtonRef}
        onClick={() => setIsActiveDropdown(!isActiveDropdown)}
      >
        <i
          className={`fa-solid fa-chevron-up expand-collapse-icon expand-collapse-icon-up`}
        />
        <i
          className={`fa-solid fa-chevron-down expand-collapse-icon expand-collapse-icon-down`}
        />
      </div>
      <div
        className={`expand-collapse-dropdown ${dropdownStyle} ${
          isActiveDropdown ? "expand-collapse-dropdown-active" : ""
        }`}
        ref={CollapseExpandDropdownRef}
      >
        <div
          className={`expand-collapse-dropdown-item ${dropdownOptionsStyle}`}
          onClick={handleCollapseButton}
        >
          <div className="expand-collapse-dropdown-text">Collapse All</div>
          <i className={`fa-solid fa-chevron-up`} />
        </div>
        <div
          className={`expand-collapse-dropdown-item ${dropdownOptionsStyle}`}
          onClick={handleExpandButton}
        >
          <div className="expand-collapse-dropdown-text">Expand All</div>
          <i className={`fa-solid fa-chevron-down`} />
        </div>
      </div>
    </div>
  );
};

export default CollapseExpandButton;

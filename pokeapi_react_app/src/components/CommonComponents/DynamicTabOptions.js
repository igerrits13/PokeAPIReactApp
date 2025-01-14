// Component to render a given list of tabs and HTML
const DynamicTabOptions = ({
  tabLabels,
  setActiveButton,
  activeButton,
  isDarkMode,
  screenSize,
}) => {
  // Setup the search bar style based on if the user is using light or dark mode
  const tabOptionFontStyle = isDarkMode
    ? "taboption-font-dark"
    : "taboption-font-light";
  const activeTabOptionFontStyle = isDarkMode
    ? "taboption-font-dark-active"
    : "taboption-font-light-active";

  // Adjust the gap between tab options based on screen size
  const tabPaddingSize =
    screenSize === "small"
      ? "tab-button-small"
      : screenSize === "medium"
      ? "tab-button-med"
      : "tab-button-large";

  // Update the active tab on click
  const handleTabOptions = (i) => {
    setActiveButton(i);
  };

  //Iterate over tabs to be displayed and render them
  return (
    <div>
      {tabLabels.map((label, i) => {
        return (
          <button
            key={i}
            className={`tab-button ${tabPaddingSize} ${tabOptionFontStyle} ${
              activeButton === i ? activeTabOptionFontStyle : ""
            }`}
            onClick={() => handleTabOptions(i)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default DynamicTabOptions;

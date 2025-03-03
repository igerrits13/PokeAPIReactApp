import StatsTableSection from "./StatsTableSection";

// Create a table section based on the input array of information
const StatsTable = ({ statsInfo, whosThatPokemon, screenSize, isDarkMode }) => {
  // Setup the line styling between information sections based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  // const lineStyle = isDarkMode
  //   ? "component-outline-bottom-dark"
  //   : "component-outline-bottom-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Display the section based on the input array. Add lines between items, but not after the last item
  return (
    <div className="secondary-table-conainer-100">
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Stats</div>
      <StatsTableSection
        statsInfo={statsInfo}
        screenSize={screenSize}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default StatsTable;

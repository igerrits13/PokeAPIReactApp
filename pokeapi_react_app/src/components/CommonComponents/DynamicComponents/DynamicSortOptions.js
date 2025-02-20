const DynamicSortOptions = ({ sortOptions, screenSize }) => {
  // If screen is small, have options in a column
  if (screenSize === "small") {
    return <div className="sortoptions-container-small">{sortOptions}</div>;
  }
  // Otherwise, display options in a row
  else {
    return <div className="sortoptions-container-med-large">{sortOptions}</div>;
  }
};

export default DynamicSortOptions;

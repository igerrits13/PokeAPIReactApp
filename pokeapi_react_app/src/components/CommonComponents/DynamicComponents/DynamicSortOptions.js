const DynamicSortOptions = ({ sortOptions, screenSize }) => {
  return (
    <div
      className={`${
        screenSize === "small"
          ? "sortoptions-container-small"
          : "sortoptions-container-med-large"
      }`}
    ></div>
  );
};

export default DynamicSortOptions;

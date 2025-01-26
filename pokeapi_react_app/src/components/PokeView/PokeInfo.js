const PokeInfo = ({ isPokeLoading, isDarkMode, screenSize }) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  return (
    !isPokeLoading && (
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "pokeview-table-small-med"
            : "pokeview-table-large"
        } ${fontStyle}`}
      >
        <div className="pokeview-table-info">Here is info</div>
        <div>Here is another div</div>
      </div>
    )
  );
};

export default PokeInfo;

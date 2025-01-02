// Display the website title
const Title = ({ screenSize, isDarkMode }) => {
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

  return (
    <>
      {screenSize === "small" ? (
        <div className={`header header-small ${fontStyle}`}>Pokémon Lookup</div>
      ) : screenSize === "medium" ? (
        <div className={`header header-med ${fontStyle}`}>Pokémon Lookup</div>
      ) : screenSize === "large" ? (
        <div className={`header header-large ${fontStyle}`}>Pokémon Lookup</div>
      ) : (
        <div className={`header header-x-large ${fontStyle}`}>
          Pokémon Lookup
        </div>
      )}
    </>
  );
};

export default Title;

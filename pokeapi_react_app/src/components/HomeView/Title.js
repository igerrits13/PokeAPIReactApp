// Display the website title
const Title = ({ screenSize, isDarkMode }) => {
  // Setup the title font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "title-font-light";
  const headerStyle =
    screenSize === "small"
      ? "header-small"
      : screenSize === "medium"
      ? "header-med"
      : screenSize === "large"
      ? "header-large"
      : "header-x-large";

  return (
    <div className={`header header-small ${fontStyle} ${headerStyle}`}>
      Pokémon Lookup
    </div>
  );
};

export default Title;

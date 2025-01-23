// Tab displaying a list of moves
const MovesTab = ({ typeData, isDarkMode }) => {
  // Setup the font style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // Display moves tab when active
  return (
    <div>
      {Object.entries(typeData.moves).map((obj, i) => {
        return (
          <div className={`${fontStyle}`} key={i}>
            {obj[1].name}
          </div>
        );
      })}
    </div>
  );
};

export default MovesTab;

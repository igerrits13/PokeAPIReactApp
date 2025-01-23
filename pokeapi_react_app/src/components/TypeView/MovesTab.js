import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";

// Tab displaying a list of moves
const MovesTab = ({ typeData, isTypesLoading, getTypeIcon, isDarkMode }) => {
  // Setup the font, section and icon style based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const moveSectionStyle = isDarkMode
    ? "component-background-dark component-outline-thin-dark"
    : "component-background-light component-outline-thin-light";

  // Get the styling for the current type
  let typeIcon, typeStyle;
  if (!isTypesLoading) {
    [typeIcon, typeStyle] = getTypeIcon(typeData.name);
  }

  // Return the name of the current game in formatted form
  const getMoveTitle = (move) => {
    return move
      .split("-")
      .map(
        (currWord) =>
          currWord.charAt(0).toUpperCase() + currWord.slice(1).toLowerCase()
      )
      .join(" ");
  };

  // Display moves tab when active
  return (
    !isTypesLoading && (
      <div className="movestab-container">
        <div
          className={`movestab-section-head ${fontStyle} ${moveSectionStyle}`}
        >
          <div className="movestab-item">Name</div>
          <div className="movestab-item">Type</div>
        </div>
        {Object.entries(typeData.moves)
          // Sort the moves alphabetically
          .sort(([keyA, moveA], [keyB, moveB]) => {
            const moveTitleA = getMoveTitle(moveA.name);
            const moveTitleB = getMoveTitle(moveB.name);
            return moveTitleA.localeCompare(moveTitleB);
          })
          .map((obj, i) => {
            return (
              <div
                className={`movestab-section ${fontStyle} ${moveSectionStyle}`}
                key={i}
              >
                <div className="movestab-item">{getMoveTitle(obj[1].name)}</div>
                <div className="movestab-item">
                  {!isTypesLoading && (
                    <DynamicSvgIcon
                      classes={`movestab-icon ${typeStyle}`}
                      IconComponent={typeIcon}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    )
  );
};

export default MovesTab;

// Display for the general information of the currently selected type
const TypeInfo = ({ typeData, isDarkMode }) => {
  // Setup the line styling between information sections based on if the user is using light or dark mode
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";

  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  // Display for the current types basic information, do not add a line to the bottom of the last section
  return (
    <div className="typeview-table-info">
      <div className={`typeview-table-info-section ${lineStyle}`}>
        <div className="typeview-table-info-name">Type ID</div>
        <div className="typeview-table-info-result">#{typeData.id}</div>
      </div>
      <div
        className={`typeview-table-info-section ${
          typeData.move_damage_class && lineStyle
        }`}
      >
        <div className="typeview-table-info-name">Generation</div>
        <div className="typeview-table-info-result">
          {getGenerationTitle(typeData.generation.name)}
        </div>
      </div>
      {/* Only display move damage class information if it exists */}
      {typeData.move_damage_class && (
        <div className="typeview-table-info-section">
          <div className="typeview-table-info-name">Move Damage Class</div>
          <div className="typeview-table-info-result">
            {typeData.move_damage_class.name[0].toUpperCase() +
              typeData.move_damage_class.name.slice(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeInfo;

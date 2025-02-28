import TypesResultsItem from "./TypesResultsItem";

// Display for full screen types table
const TypesResults = ({ typesResults, getTypeIcon, isDarkMode }) => {
  const fontStyle = isDarkMode ? "font-dark" : "font-light";

  // List of types shown as a full types table
  const typesHTML = typesResults
    .slice(0, typesResults.length - 2)
    .map((obj, i) => {
      const [typeIcon, typeStyle] = getTypeIcon(obj.name);
      return (
        <TypesResultsItem
          key={i}
          obj={obj}
          typeIcon={typeIcon}
          typeStyle={typeStyle}
          isDarkMode={isDarkMode}
        />
      );
    });

  return (
    <div>
      <div className={`sub-header ${fontStyle}`}>Types</div>
      <div className="types-table">{typesHTML}</div>
    </div>
  );
};

export default TypesResults;

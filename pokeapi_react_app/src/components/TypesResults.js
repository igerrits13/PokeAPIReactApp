import TypesResultsItem from "./TypesResultsItem";

const TypesResults = ({ typesResults, getTypeIcon, isDarkMode }) => {
  const fontStyle = isDarkMode ? "title-font-dark" : "title-font-light";

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

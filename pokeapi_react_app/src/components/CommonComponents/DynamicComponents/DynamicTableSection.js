// Create a table section based on the input array of information
const DynamicTableSection = ({ sectionInfo, isDarkMode }) => {
  // Setup the line styling between information sections based on if the user is using light or dark mode
  const lineStyle = isDarkMode
    ? "component-outline-bottom-dark"
    : "component-outline-bottom-light";

  // Display the section based on the input array. Add lines between items, but not after the last item
  return (
    <>
      {sectionInfo.map((obj) => {
        return (
          <div
            key={obj.id}
            className={`table-info-section ${
              obj.id !== sectionInfo.length - 1 ? lineStyle : ""
            }`}
          >
            <div className="table-info-name">{obj.text}</div>
            <div className="table-info-result">{obj.info}</div>
          </div>
        );
      })}
    </>
  );
};

export default DynamicTableSection;

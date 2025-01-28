import DynamicSvgIcon from "../CommonComponents/DynamicSvgIcon";
import TypeInfo from "./TypeInfo";
import DamageRelations from "./DamageRelations";

// Table of information for the currently selected type
const TypeInfoTable = ({
  isTypesLoading,
  typeData,
  getTypeIcon,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font, header and icon styles based on if the user is using light or dark mode
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "typeview-header-small"
      : screenSize === "medium"
      ? "typeview-header-med"
      : screenSize === "large"
      ? "typeview-header-large"
      : "typeview-header-x-large";
  const iconStyle = isDarkMode
    ? "component-background-dark component-rounded-outline-thin-dark"
    : "component-background-light component-rounded-outline-thin-light";

  // Get the styling for the current type
  let typeIcon, typeStyle;
  if (!isTypesLoading) {
    [typeIcon, typeStyle] = getTypeIcon(typeData.name);
  }

  // When the types have loaded, display the type information table showing basic information, damage relations and
  // the current type's icon
  return (
    !isTypesLoading && (
      <div
        className={`${
          screenSize === "small" || screenSize === "medium"
            ? "secondary-grid-row-small-med"
            : "secondary-grid-row-large"
        } ${fontStyle}`}
      >
        <TypeInfo typeData={typeData} isDarkMode={isDarkMode} />
        {/* Only show the "Damage Relations" title when screen is small or medium */}
        {(screenSize === "small" || screenSize === "medium") && (
          <div className={`${fontStyle} ${secondaryHeaderStyle}`}>
            Damage Relations
          </div>
        )}
        <DamageRelations
          isTypesLoading={isTypesLoading}
          typeData={typeData}
          getTypeIcon={getTypeIcon}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
        {/* Only show the current types large icon when screen is large or x-large */}
        {(screenSize === "large" || screenSize === "x-large") && (
          <div className={`secondary-table-conainer-20`}>
            <div className={`typeview-table-icon-outline ${iconStyle}`}>
              <DynamicSvgIcon
                classes={`typeview-table-icon ${typeStyle}`}
                IconComponent={typeIcon}
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default TypeInfoTable;

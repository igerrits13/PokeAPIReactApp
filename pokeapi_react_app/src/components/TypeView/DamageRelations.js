import DynamicTableSectionIcons from "../CommonComponents/DynamicTableSectionIcons";

// Damage relations table for the currently selected type
const DamageRelations = ({
  isTypesLoading,
  typeData,
  getTypeIcon,
  screenSize,
  isDarkMode,
}) => {
  // Damage relations information to be passed to the damage relations section
  const damageRelations = Object.entries(typeData.damage_relations).map(
    ([obj, icons], i) => {
      return { text: obj, icons: icons, id: i };
    }
  );

  // Display a table of the damage relations for the current type
  return (
    <div className="typeview-table-damage-relations">
      {!isTypesLoading && (
        <DynamicTableSectionIcons
          sectionInfo={damageRelations}
          getTypeIcon={getTypeIcon}
          screenSize={screenSize}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default DamageRelations;

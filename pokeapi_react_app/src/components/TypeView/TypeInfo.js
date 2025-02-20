import DynamicTableSection from "../CommonComponents/DynamicComponents/DynamicTableSection";

// Display for the general information of the currently selected type
const TypeInfo = ({ typeData, isDarkMode }) => {
  // Seperate the generation title by '-' and capitalize appropriate letters
  const getGenerationTitle = (generation) => {
    let genTitle = generation.split("-");
    genTitle[0] = genTitle[0][0].toUpperCase() + genTitle[0].slice(1);
    genTitle[1] = genTitle[1].toUpperCase();
    return genTitle.join(" ");
  };

  // Lines to be displayed for the basic type information table. Only add move damage class if it is not null
  const typeInfo = [
    { text: "Type ID", info: `#${typeData.id}`, id: 0 },
    {
      text: "Generation",
      info: `${getGenerationTitle(typeData.generation.name)}`,
      id: 1,
    },
    ...(typeData.move_damage_class
      ? [
          {
            text: "Move Damage Class",
            info: `${
              typeData.move_damage_class.name[0].toUpperCase() +
              typeData.move_damage_class.name.slice(1)
            }`,
            id: 2,
          },
        ]
      : []),
  ];

  // Display for the current types basic information
  return (
    <div className="secondary-table-conainer-30">
      <DynamicTableSection sectionInfo={typeInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypeInfo;

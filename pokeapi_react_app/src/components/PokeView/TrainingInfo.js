import DynamicTableSection from "../CommonComponents/DynamicTableSection";

// Training information section for the current Pokémon
const TrainingInfo = ({
  pokeData,
  pokeSpeciesData,
  screenSize,
  isDarkMode,
}) => {
  // Setup the font style based on if the user is using light or dark mode and screen size
  const fontStyle = isDarkMode ? "font-dark" : "font-light";
  const secondaryHeaderStyle =
    screenSize === "small"
      ? "secondary-page-header-small"
      : screenSize === "medium"
      ? "secondary-page-header-med"
      : screenSize === "large"
      ? "secondary-page-header-large"
      : "secondary-page-header-x-large";

  // Capitalize the first word of each part of the pokémon's name
  const getStatName = (name) => {
    const formattedName = name.split("-").map((obj, i) => {
      return obj[0].toUpperCase() + obj.slice(1);
    });

    return formattedName.join(" ");
  };

  // Data structure to store the training information for the current Pokémon
  const trainingInfo = [
    {
      text: "EV Stats",
      info: `${Object.entries(pokeData.stats)
        .map((stat) => {
          if (stat[1].effort !== 0) {
            return `${stat[1].effort} ${getStatName(stat[1].stat.name)}`;
          }
          return null;
        })
        .filter(Boolean)
        .join(", ")}`,
      id: 0,
    },
    { text: "Base XP", info: `${pokeData.base_experience} XP`, id: 1 },
    {
      text: "Base Happiness",
      info: `${pokeSpeciesData.base_happiness} (${(
        (pokeSpeciesData.base_happiness / 255) *
        100
      ).toFixed(0)}% Happy)`,
      id: 2,
    },
    {
      text: "Capture Rate",
      info: `${pokeSpeciesData.capture_rate} (${(
        (pokeSpeciesData.capture_rate / 255) *
        100
      ).toFixed(0)}% Chance)`,
      id: 3,
    },
    {
      text: "Held Items",
      info:
        Object.entries(pokeData.held_items).length !== 0
          ? `${Object.entries(pokeData.held_items)
              .map((item) => {
                return `${getStatName(item[1].item.name)}`;
              })
              .join(", ")}`
          : "None",
      id: 4,
    },
  ];

  // Display the training information for the current Pokémon
  return (
    <div
      className={`${
        screenSize === "large"
          ? "secondary-table-conainer-50"
          : "secondary-table-conainer-30"
      }`}
    >
      <div className={`${fontStyle} ${secondaryHeaderStyle}`}>Training</div>
      <DynamicTableSection sectionInfo={trainingInfo} isDarkMode={isDarkMode} />
    </div>
  );
};

export default TrainingInfo;
